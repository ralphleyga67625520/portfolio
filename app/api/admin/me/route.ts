import { getAdminFromToken } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminFromToken();
  if (!admin) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
  return Response.json({ authenticated: true, username: admin.username });
}
