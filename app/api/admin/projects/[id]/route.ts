import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

// PUT update project
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(project);
}

// DELETE project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const { id } = await params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ success: true });
}
