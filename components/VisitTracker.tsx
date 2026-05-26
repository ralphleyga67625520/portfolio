"use client";

import { useEffect } from "react";

async function getGeoInfo() {
  const geoInfo = { latitude: "N/A", longitude: "N/A", accuracy: "N/A" };

  if ("geolocation" in navigator) {
    try {
      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            geoInfo.latitude = position.coords.latitude.toFixed(4);
            geoInfo.longitude = position.coords.longitude.toFixed(4);
            geoInfo.accuracy = `${Math.round(position.coords.accuracy)}m`;
            resolve();
          },
          () => reject(new Error("Geolocation denied or unavailable")),
          { timeout: 3000 }
        );
      });
    } catch {
      // ignore geolocation failures
    }
  }

  return geoInfo;
}

export default function VisitTracker() {
  useEffect(() => {
    const sendVisit = async () => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages ? navigator.languages.join(", ") : "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        screenColorDepth: window.screen.colorDepth,
        deviceMemory: (navigator as any).deviceMemory || "Unknown",
        hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
      };

      const connection = (navigator as any).connection || (navigator as any).mozConnection || {};
      const networkInfo = {
        effectiveType: connection.effectiveType || "Unknown",
        downlink: connection.downlink || "Unknown",
        rtt: connection.rtt || "Unknown",
        saveData: connection.saveData || "Unknown",
      };

      const pageInfo = {
        url: window.location.href,
        referrer: document.referrer || "Direct",
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      };

      const geoInfo = await getGeoInfo();

      try {
        await fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceInfo, networkInfo, pageInfo, geoInfo }),
        });
      } catch (error) {
        console.error("Visit tracking error:", error);
      }
    };

    sendVisit();
  }, []);

  return null;
}
