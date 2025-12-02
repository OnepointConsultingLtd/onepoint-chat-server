import { MongoClient, Db, Collection } from "mongodb";

const URI: string = process.env.MONGO_URI as string;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME || "conversations";

if (!URI) {
  console.error("❌ MONGO_URI is not set in environment variables. Please check your .env.local file.");
  console.error("Expected: MONGO_URI=mongodb://localhost:27017");
}

if (!DB_NAME) {
  console.error("❌ MONGO_DB_NAME is not set in environment variables. Please check your .env.local file.");
}

const client = new MongoClient(URI || "mongodb://localhost:27017");
let isConnected = false;

export async function getDB(): Promise<Db> {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("✅ Connected to MongoDB successfully");
    } catch (error: any) {
      console.error("❌ Failed to connect to MongoDB:");
      console.error("   Error:", error.message);
      console.error("   URI:", URI || "mongodb://localhost:27017");
      console.error("   Make sure MongoDB is running and accessible.");
      console.error("   On Windows, you can start MongoDB with: net start MongoDB");
      console.error("   Or check if MongoDB service is running in Services (services.msc)");
      throw error;
    }
  }
  return client.db(DB_NAME);
}

export async function getCollection(): Promise<Collection> {
  const db = await getDB();
  return db.collection(COLLECTION_NAME);
}
