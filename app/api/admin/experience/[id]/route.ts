import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const item = await Experience.findByIdAndUpdate(id, body, { new: true });
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const item = await Experience.findByIdAndDelete(id);
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
