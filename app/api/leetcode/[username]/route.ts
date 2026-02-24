import { fetchLeetCodeStats } from "@/lib/leetcode";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const stats = await fetchLeetCodeStats(username);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[LeetCode API]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
