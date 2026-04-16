import { verifyToken } from "@clerk/backend";

const ALLOWED_ORIGINS = ["https://osca.onepointltd.ai", "http://localhost:5173", "http://localhost:3000", "http://localhost:5000"];

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
    const { sub } = await verifyToken(token, {
      secretKey,
      authorizedParties: ALLOWED_ORIGINS,
    });
    return sub ?? null;
  } catch {
    return null;
  }
}
