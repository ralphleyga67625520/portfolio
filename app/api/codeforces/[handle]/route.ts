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
  } catch (_error) {
    // If Codeforces is unavailable or the handle request fails, return safe fallback stats.
    return NextResponse.json(
      {
        rating: 0,
        maxRating: 0,
        rank: "unrated",
        maxRank: "unrated",
        contestsAttended: 0,
      },
      { status: 200 }
    );
  }
}
