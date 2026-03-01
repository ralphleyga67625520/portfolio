import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Social from "@/models/Social";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const socials = await Social.find().sort({ order: 1 });
  return Response.json(socials);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const social = await Social.create(body);
  return Response.json(social, { status: 201 });
}
