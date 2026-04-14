import type { Db } from "mongodb";
import type { ClientDocument } from "./clientDocument";

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
