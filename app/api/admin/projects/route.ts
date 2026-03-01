import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

// GET all projects (public)
export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return Response.json(projects);
}

// POST create project (admin only)
export async function POST(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const project = await Project.create(body);
  return Response.json(project, { status: 201 });
}
