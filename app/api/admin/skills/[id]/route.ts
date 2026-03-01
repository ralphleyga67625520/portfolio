import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import SkillCategory from "@/models/SkillCategory";
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
  const category = await SkillCategory.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!category)
    return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(category);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const category = await SkillCategory.findByIdAndDelete(id);
  if (!category)
    return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
