import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import SkillCategory from "@/models/SkillCategory";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const categories = await SkillCategory.find().sort({ order: 1 });
  return Response.json(categories);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const category = await SkillCategory.create(body);
  return Response.json(category, { status: 201 });
}
