import { MongoClient, Db, Collection } from "mongodb";

const URI: string = process.env.MONGO_URI as string;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME || "conversations";

const client = new MongoClient(URI);
let isConnected = false;

export async function getDB(): Promise<Db> {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db(DB_NAME);
}

export async function getCollection(): Promise<Collection> {
  const db = await getDB();
  return db.collection(COLLECTION_NAME);
}
