import { verifyToken } from "@clerk/backend";
import { getCachedAllowedOrigins } from "../db/registry";

export async function getVerifiedUserId(req: { headers: { authorization?: string } }): Promise<string | null> {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    console.warn("CLERK_SECRET_KEY not set, skipping token verification");
    return null;
  }

  try {
    const authorizedParties = getCachedAllowedOrigins();
    const { sub } = await verifyToken(token, {
      secretKey,
      authorizedParties: authorizedParties.length > 0 ? authorizedParties : undefined,
    });
    return sub ?? null;
  } catch {
    return null;
  }
}
