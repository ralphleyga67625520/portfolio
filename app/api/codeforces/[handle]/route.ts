import { fetchCodeforcesStats } from "@/lib/codeforces";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;

  if (!handle) {
    return NextResponse.json(
      { error: "Handle is required" },
      { status: 400 }
    );
  }

  try {
    const stats = await fetchCodeforcesStats(handle);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[Codeforces API]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Codeforces stats" },
      { status: 500 }
    );
  }
}
