"use client";

import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

/**
 * A slim, persistent banner pinned to the top of the viewport —
 * shown only on mobile/tablet, suggesting the user visit on desktop.
 * Always visible, never auto-hides or dismisses.
 */
export default function DesktopHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on narrow viewports
    if (window.innerWidth >= 768) return;
    setVisible(true);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] md:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Top accent gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

      {/* Banner body */}
      <div className="flex items-center justify-center gap-2.5 bg-neutral-900/95 px-4 py-2 backdrop-blur-xl shadow-lg">
        <Monitor className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
        <span className="text-xs font-medium text-neutral-300">
          This site is best experienced on a desktop
        </span>
      </div>
    </div>
  );
}
