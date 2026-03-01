import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Certification from "@/models/Certification";
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
  const cert = await Certification.findByIdAndUpdate(id, body, { new: true });
  if (!cert) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(cert);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const cert = await Certification.findByIdAndDelete(id);
  if (!cert) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
