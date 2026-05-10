"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Returns `true` when the given CSS media-query matches.
 * Server-side and first paint default to `false`.
 *
 * Includes a small debounce (100ms) so transient viewport changes
 * (e.g. mobile address bar toggling during scroll) don't cause
 * flicker between mobile/desktop layouts.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);

    // Set immediately on mount — no debounce for first read
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      // Debounce subsequent changes to avoid flicker
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setMatches(e.matches);
      }, 100);
    };

    mql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  return matches;
}
