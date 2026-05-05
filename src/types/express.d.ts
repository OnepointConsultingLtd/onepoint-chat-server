import type { Db } from "mongodb";
import type { ClientDocument } from "./clientDocument";

/**
 * Extend the Express request object with client and client database properties. 
 * 
 * @see {@link middleware/resolveClient.ts}
 * @see {@link types/clientDocument.ts}
 * @see {@link mongodb.Db}
 */



declare global {
  namespace Express {
    interface Request {
      /** Set by `resolveClient` middleware on tenant API routes */
      client?: ClientDocument;
      clientDb?: Db;
    }
  }
}

export {};
