import type { Request, RequestHandler } from "express";
import { getClientByToken, getClientDb, isOriginAllowedForClient } from "../db/registry";

/**
 * Extract the client token from the request headers, body, or query parameters.
 * 
 * @param req - The request object.
 * @returns The client token.
 */


function extractWidgetToken(req: Pick<Request, "headers" | "body" | "query">): string | null {
  const x = req.headers["x-osca-token"];
  if (typeof x === "string" && x.trim()) return x.trim();

  if (req.body && typeof req.body === "object" && req.body !== null && "token" in req.body) {
    const token = (req.body as { token?: unknown }).token;
    if (typeof token === "string" && token.trim()) return token.trim();
  }

  const q = req.query.token;
  if (typeof q === "string" && q.trim()) return q.trim();

  return null;
}

export const resolveClient: RequestHandler = async (req, res, next) => {
  try {
    const token = extractWidgetToken(req);
    if (!token) {
      res.status(401).json({
        error: "Missing client token (X-Osca-Token header, body.token, or query token).",
      });
      return;
    }

    const client = await getClientByToken(token);
    if (!client || !client.active) {
      res.status(401).json({ error: "Unknown or inactive client" });
      return;
    }

    const origin = req.headers.origin;
    if (!isOriginAllowedForClient(origin, client)) {
      res.status(403).json({ error: "Origin not allowed for this client" });
      return;
    }

    req.client = client;
    req.clientDb = await getClientDb(client.dbName);
    next();
  } catch (e) {
    console.error("resolveClient:", e);
    res.status(500).json({ error: "Client resolution failed" });
  }
};
