import { MongoClient, Db, Collection } from "mongodb";

const URI: string = process.env.MONGO_URI as string;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME || "conversations";

if (!URI) {
  console.error("MONGO_URI is not set in environment variables. Check your .env.local file.");
}

if (!DB_NAME) {
  console.error("MONGO_DB_NAME is not set in environment variables. Check your .env.local file.");
}

const client = new MongoClient(URI || "mongodb://localhost:27017");
let isConnected = false;

const RETRY_COOLDOWN_MS = 30_000;
let lastFailedAt = 0;
let connectingPromise: Promise<void> | null = null;

export async function getDB(): Promise<Db> {
  if (isConnected) return client.db(DB_NAME);

  if (connectingPromise) return connectingPromise.then(() => client.db(DB_NAME));

  const now = Date.now();
  if (now - lastFailedAt < RETRY_COOLDOWN_MS) {
    throw new Error("MongoDB unavailable (retry cooldown active)");
  }

  connectingPromise = client
    .connect()
    .then(() => {
      isConnected = true;
      lastFailedAt = 0;
      console.log("Connected to MongoDB");
    })
    .catch((error: any) => {
      lastFailedAt = Date.now();
      console.error(`MongoDB connection failed: ${error.message}`);
      throw error;
    })
    .finally(() => {
      connectingPromise = null;
    });

  await connectingPromise;
  return client.db(DB_NAME);
}

export async function getCollection(): Promise<Collection> {
  const db = await getDB();
  return db.collection(COLLECTION_NAME);
}
