"use client";

import { useEffect } from "react";
import Spline from "@splinetool/react-spline";

export default function QuietSpline({ scene }: { scene: string }) {
  useEffect(() => {
    const orig = console.error;

    console.error = (...args: unknown[]) => {
      try {
        const first = args[0];
        const msg = typeof first === "string" ? first : String(first);
        if (msg.includes("Missing property")) return;
      } catch (e) {
        // fall through to original
      }
      orig(...args);
    };

    return () => {
      console.error = orig;
    };
  }, []);

  return <Spline scene={scene} />;
}
