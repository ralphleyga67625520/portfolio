import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import AboutModel from "@/models/About";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

// GET about data (public)
export async function GET() {
  await dbConnect();
  const about = await AboutModel.findOne();
  return Response.json(about || {});
}

// PUT upsert about data (admin only)
export async function PUT(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const about = await AboutModel.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return Response.json(about);
}
