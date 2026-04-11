"use client";

import { useState, useEffect } from "react";
import { Monitor, X } from "lucide-react";

/**
 * A subtle, dismissible banner shown only on mobile/tablet
 * suggesting the user visit on desktop for a richer experience.
 * - Auto-hides after 8 seconds
 * - Remembers dismissal via localStorage for 7 days
 * - Renders nothing on desktop (CSS + JS guard)
 */
export default function DesktopHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on narrow viewports
    if (window.innerWidth >= 768) return;

    // Respect previous dismissal
    const dismissed = localStorage.getItem("desktop-hint-dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000)
      return;

    // Slight delay so it doesn't flash during initial load
    const showTimer = setTimeout(() => setVisible(true), 2500);

    // Auto-hide after 20s
    const hideTimer = setTimeout(() => setVisible(false), 22500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem("desktop-hint-dismissed", String(Date.now()));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 md:hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-neutral-900/90 px-4 py-2.5 shadow-2xl backdrop-blur-md">
        <Monitor className="h-4 w-4 shrink-0 text-cyan-400" />
        <span className="text-xs text-neutral-300">
          Best viewed on desktop
        </span>
        <button
          onClick={dismiss}
          className="ml-1 shrink-0 rounded-full p-0.5 text-neutral-500 transition hover:bg-white/10 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
