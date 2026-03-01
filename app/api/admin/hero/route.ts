import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

// GET hero data (public) — returns the first (and only) hero doc
export async function GET() {
  await dbConnect();
  const hero = await HeroModel.findOne();
  return Response.json(hero || {});
}

// PUT upsert hero data (admin only)
export async function PUT(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const hero = await HeroModel.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  return Response.json(hero);
}
