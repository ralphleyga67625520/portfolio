import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "portfolio-admin-secret-change-me";

export function signToken(payload: { id: string; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
  } catch {
    return null;
  }
}

export async function getAdminFromToken(): Promise<{
  id: string;
  username: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
