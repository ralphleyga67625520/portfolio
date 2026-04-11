import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const items = await Experience.find().sort({ order: 1, createdAt: -1 });
  return Response.json(items);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const item = await Experience.create(body);
  return Response.json(item, { status: 201 });
}
