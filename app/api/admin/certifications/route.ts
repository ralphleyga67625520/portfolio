import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Certification from "@/models/Certification";
import { getAdminFromToken, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const certs = await Certification.find().sort({ order: 1, createdAt: -1 });
  return Response.json(certs);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromToken();
  if (!admin) return unauthorizedResponse();

  await dbConnect();
  const body = await req.json();
  const cert = await Certification.create(body);
  return Response.json(cert, { status: 201 });
}
