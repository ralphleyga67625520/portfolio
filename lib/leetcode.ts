/* ------------------------------------------------------------------ */
/*  LeetCode GraphQL API — Server-side data fetching                   */
/* ------------------------------------------------------------------ */

const LEETCODE_API = "https://leetcode.com/graphql";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  contestRating: number;
  contestsAttended: number;
  contestGlobalRanking: number | null;
  contestBadge: string | null; // e.g. "Knight"
}

/* ------------------------------------------------------------------ */
/*  GraphQL queries                                                    */
/* ------------------------------------------------------------------ */

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

const CONTEST_RANKING_QUERY = `
  query userContestRankingInfo($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      badge {
        name
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Raw response types (internal)                                      */
/* ------------------------------------------------------------------ */

interface AcSubmissionNum {
  difficulty: string;
  count: number;
  submissions: number;
}

interface AllQuestionsCount {
  difficulty: string;
  count: number;
}

interface ProfileQueryData {
  allQuestionsCount: AllQuestionsCount[];
  matchedUser: {
    contributions: { points: number };
    profile: { reputation: number; ranking: number };
    submitStats: {
      acSubmissionNum: AcSubmissionNum[];
      totalSubmissionNum: AcSubmissionNum[];
    };
  };
}

interface ContestQueryData {
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    badge: { name: string } | null;
  } | null;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function gqlFetch<T>(query: string, variables: Record<string, string>): Promise<T> {
  const res = await fetch(LEETCODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // cache for 1 hour (Next.js extended fetch)
  });

  if (!res.ok) {
    throw new Error(`LeetCode API returned ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "Unknown LeetCode API error");
  }

  return json.data as T;
}

/* ------------------------------------------------------------------ */
/*  Main fetch function                                                */
/* ------------------------------------------------------------------ */

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  // Fire both queries in parallel
  const [profileData, contestData] = await Promise.all([
    gqlFetch<ProfileQueryData>(USER_PROFILE_QUERY, { username }),
    gqlFetch<ContestQueryData>(CONTEST_RANKING_QUERY, { username }),
  ]);

  const { allQuestionsCount, matchedUser } = profileData;
  const acSub = matchedUser.submitStats.acSubmissionNum;

  // acSubmissionNum order: [All, Easy, Medium, Hard]
  const findCount = (arr: AcSubmissionNum[], diff: string) =>
    arr.find((s) => s.difficulty === diff)?.count ?? 0;

  const findTotal = (arr: AllQuestionsCount[], diff: string) =>
    arr.find((q) => q.difficulty === diff)?.count ?? 0;

  const contestRanking = contestData.userContestRanking;

  return {
    totalSolved: findCount(acSub, "All"),
    easySolved: findCount(acSub, "Easy"),
    mediumSolved: findCount(acSub, "Medium"),
    hardSolved: findCount(acSub, "Hard"),
    totalEasy: findTotal(allQuestionsCount, "Easy"),
    totalMedium: findTotal(allQuestionsCount, "Medium"),
    totalHard: findTotal(allQuestionsCount, "Hard"),
    ranking: matchedUser.profile.ranking,
    contributionPoints: matchedUser.contributions.points,
    reputation: matchedUser.profile.reputation,
    contestRating: Math.round(contestRanking?.rating ?? 0),
    contestsAttended: contestRanking?.attendedContestsCount ?? 0,
    contestGlobalRanking: contestRanking?.globalRanking ?? null,
    contestBadge: contestRanking?.badge?.name ?? null,
  };
}
