"use client";

import { useEffect, useState } from "react";
import type { CodeforcesStats } from "@/lib/codeforces";

interface UseCodeforcesDataReturn {
  data: CodeforcesStats | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Client-side hook that fetches Codeforces stats via the internal API route.
 *
 * @param handle – Codeforces handle to query
 */
export function useCodeforcesStats(handle: string): UseCodeforcesDataReturn {
  const [data, setData] = useState<CodeforcesStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setIsLoading(false);
      setError("No handle provided");
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/codeforces/${encodeURIComponent(handle)}`);

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? `HTTP ${res.status}`);
        }

        const stats: CodeforcesStats = await res.json();

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
  }, [handle]);

  return { data, isLoading, error };
}
