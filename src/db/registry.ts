import crypto from "crypto";
import fs from "fs";
import { MongoClient, Db, Collection, Document } from "mongodb";
import type { ClientDocument } from "../types/clientDocument";
import type { LLMProviderName } from "../types/enums";

let mongoClient: MongoClient | null = null;
let registryConnected = false;
const clientDbCache = new Map<string, Db>();

const REGISTRY_DB = process.env.MONGO_REGISTRY_DB || "osca-registry";

function getUri(): string {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");
  return uri;
}

export async function connectRegistry(): Promise<void> {
  if (registryConnected) return;

  mongoClient = new MongoClient(getUri());
  await mongoClient.connect();
  registryConnected = true;
  console.log(`Connected to MongoDB registry database: ${REGISTRY_DB}`);

  const col = getClientsCollection();
  await col.createIndex({ token: 1 }, { unique: true });
  await refreshAllowedOriginsCache();
}

function getClientSingleton(): MongoClient {
  if (!mongoClient || !registryConnected) {
    throw new Error("Registry not connected; call connectRegistry() first");
  }
  return mongoClient;
}

export function getRegistryDb(): Db {
  return getClientSingleton().db(REGISTRY_DB);
}

export function getClientsCollection(): Collection<ClientDocument> {
  return getRegistryDb().collection<ClientDocument>("clients");
}

function toClientDocument(doc: Document & { _id: unknown }): ClientDocument {
  const { _id, ...rest } = doc as ClientDocument & { _id: unknown };
  return {
    ...(rest as Omit<ClientDocument, "_id">),
    _id: String(_id),
  };
}

export async function getClientByToken(token: string): Promise<ClientDocument | null> {
  if (!token?.trim()) return null;
  const raw = await getClientsCollection().findOne({ token: token.trim() });
  if (!raw) return null;
  return toClientDocument(raw as Document & { _id: unknown });
}

export async function getClientById(id: string): Promise<ClientDocument | null> {
  const raw = await getClientsCollection().findOne({ _id: id });
  if (!raw) return null;
  return toClientDocument(raw as Document & { _id: unknown });
}

export async function getClientDb(dbName: string): Promise<Db> {
  let db = clientDbCache.get(dbName);
  if (db) return db;
  db = getClientSingleton().db(dbName);
  clientDbCache.set(dbName, db);
  return db;
}

export async function provisionClientDb(dbName: string): Promise<Db> {
  const db = await getClientDb(dbName);
  const existing = new Set((await db.listCollections().toArray()).map((c) => c.name));
  if (!existing.has("conversations")) {
    await db.createCollection("conversations");
  }
  if (!existing.has("shares")) {
    await db.createCollection("shares");
  }
  return db;
}

/** Used for CORS and Clerk authorizedParties */
/** Refreshed on startup, after admin mutations, and from `refreshAllowedOriginsCache`. */
let allowedOriginsCache: string[] = [];

export function getCachedAllowedOrigins(): string[] {
  return [...allowedOriginsCache];
}

export async function refreshAllowedOriginsCache(): Promise<void> {
  allowedOriginsCache = await collectAllowedOriginsFromRegistry();
}

//  Collect allowed origins from the registry.
export async function collectAllowedOriginsFromRegistry(): Promise<string[]> {
  const col = getClientsCollection();
  const clients = await col.find({ active: true }).toArray();
  const urls = new Set<string>();
  for (const c of clients) {
    for (const d of c.domains || []) {
      const trimmed = d.trim();
      if (!trimmed) continue;
      const lower = trimmed.toLowerCase();
      if (lower.includes("://")) {
        urls.add(trimmed);
      } else if (lower.startsWith("localhost") || lower.startsWith("127.0.0.1")) {
        urls.add(`http://${trimmed}`);
      } else {
        urls.add(`https://${trimmed}`);
        urls.add(`http://${trimmed}`);
      }
    }
  }
  return [...urls];
}

/** If registry has zero clients, insert a minimal Onepoint row (run migrate script for full data). */
export async function ensureOnepointSeedIfEmpty(): Promise<void> {
  const col = getClientsCollection();
  const count = await col.countDocuments();
  if (count > 0) return;

  const dbName = process.env.ONEPOINT_SEED_DB_NAME || "onepoint-agent-db";
  const token =
    process.env.ONE_TIME_TOKEN ||
    process.env.SEED_WIDGET_TOKEN ||
    `osca_live_${crypto.randomBytes(16).toString("hex")}`;

  console.warn(
    "[registry] No clients found — creating minimal Onepoint seed. Run scripts/migrate-to-multitenant.ts for full migration.",
  );
  console.warn(
    `[registry] Seed client token (prefix): ${token.slice(0, 24)}… — must match chat UI token (ONE_TIME_TOKEN / VITE_OSCA_CLIENT_TOKEN).`,
  );


  // Insert the Onepoint seed client document
  await col.insertOne({
    _id: crypto.randomUUID(),
    name: "Onepoint (seed)",
    projectName: "osca-onepoint",
    token,
    domains: ["localhost:5173", "127.0.0.1:5173", "localhost:3000", "osca.onepointltd.ai"],
    provider: (process.env.SEED_LLM_PROVIDER as LLMProviderName) || "openai",
    model: process.env.SEED_LLM_MODEL || "gpt-4o",
    prompt: "",
    dbName,
    active: true,
    createdAt: new Date().toISOString(),
  } as ClientDocument);

  await provisionClientDb(dbName);
  await refreshAllowedOriginsCache();
}

export function isOriginAllowedForClient(origin: string | undefined, client: ClientDocument): boolean {
  if (!origin) return true;
  let host: string;
  try {
    host = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }
  for (const d of client.domains || []) {
    const rule = d.trim().toLowerCase();
    if (!rule) continue;
    const ruleHost = rule.includes("://") ? new URL(rule).host.toLowerCase() : rule;
    if (host === ruleHost) return true;
    if (host.endsWith(`.${ruleHost}`)) return true;
  }
  return false;
}

/** Admin: insert client + provision DB */
export async function insertClientDoc(doc: Omit<ClientDocument, "_id" | "createdAt"> & { _id?: string }): Promise<ClientDocument> {
  const full: ClientDocument = {
    _id: doc._id || crypto.randomUUID(),
    name: doc.name,
    projectName: doc.projectName,
    token: doc.token,
    domains: doc.domains,
    provider: doc.provider,
    model: doc.model,
    prompt: doc.prompt,
    dbName: doc.dbName,
    active: doc.active,
    createdAt: new Date().toISOString(),
    ...(doc.topicsPrompt !== undefined ? { topicsPrompt: doc.topicsPrompt } : {}),
    ...(doc.predefinedQuickQuestions !== undefined
      ? { predefinedQuickQuestions: doc.predefinedQuickQuestions }
      : {}),
    ...(doc.publicBranding !== undefined ? { publicBranding: doc.publicBranding } : {}),
  };
  await getClientsCollection().insertOne(full);
  await provisionClientDb(full.dbName);
  await refreshAllowedOriginsCache();
  return full;
}

export async function updateClientDoc(
  id: string,
  patch: Partial<Omit<ClientDocument, "_id" | "createdAt">>,
  unset?: Record<string, 1>,
): Promise<ClientDocument | null> {
  const update: Record<string, unknown> = {};
  if (Object.keys(patch).length > 0) update.$set = patch;
  if (unset && Object.keys(unset).length > 0) update.$unset = unset;
  if (Object.keys(update).length === 0) {
    const cur = await getClientById(id);
    return cur;
  }
  const res = await getClientsCollection().findOneAndUpdate(
    { _id: id },
    update as Document,
    { returnDocument: "after" },
  );
  if (!res) return null;
  const doc = toClientDocument(res as Document & { _id: unknown });
  await refreshAllowedOriginsCache();
  return doc;
}

export async function deleteClientDoc(id: string): Promise<boolean> {
  const r = await getClientsCollection().deleteOne({ _id: id });
  if (r.deletedCount === 1) await refreshAllowedOriginsCache();
  return r.deletedCount === 1;
}

export async function listAllClients(): Promise<ClientDocument[]> {
  const docs = await getClientsCollection().find({}).toArray();
  return docs.map((d) => toClientDocument(d as Document & { _id: unknown }));
}

/** Optional: load seed prompt from a one-time file path (legacy migration). */
export function readLegacyPromptFileOptional(): string {
  const p = process.env.SEED_PROMPT_FILE || process.env.PROMPT_FILE;
  if (!p || !fs.existsSync(p)) return "";
  return fs.readFileSync(p, "utf8");
}
