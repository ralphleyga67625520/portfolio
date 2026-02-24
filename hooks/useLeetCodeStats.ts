"use client";

import { useEffect, useState } from "react";
import type { LeetCodeStats } from "@/lib/leetcode";

interface UseLeetCodeDataReturn {
  data: LeetCodeStats | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Client-side hook that fetches LeetCode stats via the internal API route.
 *
 * @param username – LeetCode username to query
 */
export function useLeetCodeStats(username: string): UseLeetCodeDataReturn {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setIsLoading(false);
      setError("No username provided");
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/leetcode/${encodeURIComponent(username)}`);

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? `HTTP ${res.status}`);
        }

        const stats: LeetCodeStats = await res.json();

        if (!cancelled) {
          setData(stats);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, isLoading, error };
}
