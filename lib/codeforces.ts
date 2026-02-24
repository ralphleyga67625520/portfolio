/* ------------------------------------------------------------------ */
/*  Codeforces REST API — Server-side data fetching                    */
/* ------------------------------------------------------------------ */

const CF_API = "https://codeforces.com/api";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contestsAttended: number;
}

/* ------------------------------------------------------------------ */
/*  Raw response types (internal)                                      */
/* ------------------------------------------------------------------ */

interface CfApiResponse<T> {
  status: string;
  result: T;
}

interface CfUserInfo {
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  handle: string;
}

interface CfRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function cfFetch<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${CF_API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Codeforces API returned ${res.status}`);
  }

  const json: CfApiResponse<T> = await res.json();

  if (json.status !== "OK") {
    throw new Error("Codeforces API error");
  }

  return json.result;
}

/* ------------------------------------------------------------------ */
/*  Main fetch function                                                */
/* ------------------------------------------------------------------ */

export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats> {
  // Fire both queries in parallel
  const [userInfoArr, ratingChanges] = await Promise.all([
    cfFetch<CfUserInfo[]>("user.info", { handles: handle }),
    cfFetch<CfRatingChange[]>("user.rating", { handle }),
  ]);

  const userInfo = userInfoArr[0];

  return {
    rating: userInfo.rating ?? 0,
    maxRating: userInfo.maxRating ?? 0,
    rank: userInfo.rank ?? "unrated",
    maxRank: userInfo.maxRank ?? "unrated",
    contestsAttended: ratingChanges.length,
  };
}
