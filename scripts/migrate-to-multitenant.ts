/**
 * One-time migration: seed osca-registry.clients from legacy .env (LLM_PROVIDER, PROMPT_FILE,
 * MONGO_DB_NAME, ONE_TIME_TOKEN, etc.). Preserves existing DB name so conversations stay put.
 *
 * Run: npx ts-node scripts/migrate-to-multitenant.ts
 */
import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {
  connectRegistry,
  getClientsCollection,
  provisionClientDb,
  refreshAllowedOriginsCache,
} from "../src/db/registry";
import type { ClientDocument } from "../src/types/clientDocument";
import type { LLMProviderName } from "../src/types/enums";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function readPromptFile(): string {
  const p = process.env.PROMPT_FILE;
  if (!p) return "";
  const abs = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  if (!fs.existsSync(abs)) {
    console.warn(`PROMPT_FILE not found: ${abs}`);
    return "";
  }
  return fs.readFileSync(abs, "utf8");
}

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is required");
    process.exit(1);
  }

  const dbName = process.env.MONGO_DB_NAME;
  if (!dbName) {
    console.error("MONGO_DB_NAME is required for migration (existing tenant database name)");
    process.exit(1);
  }

  await connectRegistry();
  const col = getClientsCollection();

  const existing = await col.countDocuments();
  if (existing > 0) {
    console.log(`Registry already has ${existing} client(s). Skipping insert (idempotent guard).`);
    return;
  }

  const prompt = readPromptFile();
  const token =
    process.env.ONE_TIME_TOKEN ||
    process.env.WIDGET_TOKEN ||
    `osca_live_${crypto.randomBytes(24).toString("hex")}`;

  const provider = (process.env.LLM_PROVIDER as LLMProviderName) || "openai";
  const model =
    provider === "openai"
      ? process.env.OPENAI_MODEL || "gpt-4o"
      : provider === "claude"
        ? process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514"
        : process.env.GEMINI_MODEL || "gemini-2.0-flash";

  const doc: ClientDocument = {
    _id: crypto.randomUUID(),
    name: process.env.ONEPOINT_CLIENT_NAME || "Onepoint",
    projectName: process.env.ONEPOINT_PROJECT_NAME || "osca-onepoint",
    token,
    domains: (process.env.ONEPOINT_DOMAINS || "localhost:5173,localhost:3000,osca.onepointltd.ai")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    provider,
    model,
    prompt,
    dbName,
    active: true,
    createdAt: new Date().toISOString(),
  };

  await col.insertOne(doc);
  console.log("Inserted Onepoint client document:", {
    _id: doc._id,
    dbName: doc.dbName,
    tokenPreview: `${doc.token.slice(0, 24)}…`,
  });

  await provisionClientDb(dbName);
  await refreshAllowedOriginsCache();

  console.log(
    "Migration complete. Set MONGO_REGISTRY_DB in .env and keep MONGO_URI; tenant data remains in",
    dbName,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
