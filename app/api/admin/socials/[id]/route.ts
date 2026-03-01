import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Social from "@/models/Social";
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
  const social = await Social.findByIdAndUpdate(id, body, { new: true });
  if (!social) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(social);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const social = await Social.findByIdAndDelete(id);
  if (!social) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
