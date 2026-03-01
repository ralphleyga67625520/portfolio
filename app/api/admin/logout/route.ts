import { getAdminFromToken } from "@/lib/auth";

export async function POST() {
  const admin = await getAdminFromToken();
  if (!admin) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const response = Response.json({ success: true });
  response.headers.set(
    "Set-Cookie",
    "admin_token=; Path=/; HttpOnly; Max-Age=0"
  );
  return response;
}
