import { NextResponse } from "next/server";

// Function to get client IP address from common proxy headers
function getClientIp(request: Request): string {
  const headers = request.headers;
  const candidates = [
    headers.get("x-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    headers.get("fastly-client-ip"),
    headers.get("true-client-ip"),
    headers.get("x-client-ip"),
    headers.get("x-forwarded"),
    headers.get("forwarded"),
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const ip = candidate.split(",")[0].trim();
    if (ip && ip !== "-") {
      return ip;
    }
  }

  return "Unknown";
}

function isLocalhost(ip: string): boolean {
  if (!ip) return true;
  const lowercaseIp = ip.toLowerCase();
  if (lowercaseIp === "127.0.0.1" || lowercaseIp === "::1") return true;
  if (lowercaseIp.includes("::ffff:127.0.0.1") || lowercaseIp.includes("::fff:127.0.0.1")) return true;
  if (lowercaseIp.includes("localhost") || lowercaseIp === "-") return true;
  return false;
}

async function getIpGeolocation(ip: string) {
  try {
    if (isLocalhost(ip)) {
      return {
        country: "Local/Development 🌍",
        city: "Testing Environment",
        flag: "🏠",
      };
    }

    const response = await fetch(`https://ip-api.com/json/${ip}?fields=country,city,status`);
    const data = await response.json();

    if (data.status === "success") {
      return {
        country: data.country || "Unknown",
        city: data.city || "Unknown",
        flag: "📍",
      };
    }

    return {
      country: "Unknown",
      city: "Unknown",
      flag: "❓",
    };
  } catch (error) {
    console.error("Geolocation error:", error);
    return {
      country: "Error fetching",
      city: "N/A",
      flag: "⚠️",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { deviceInfo = {}, networkInfo = {}, pageInfo = {}, geoInfo = {} } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not configured");
      return NextResponse.json({ error: "Discord webhook is not configured" }, { status: 500 });
    }

    const clientIp = getClientIp(request);
    const ipLocation = await getIpGeolocation(clientIp);

    const embed = {
      title: "👀 New Portfolio Visitor",
      description: "A visitor landed on the portfolio site.",
      color: 1127128,
      fields: [
        {
          name: `${ipLocation.flag} Location Information`,
          value: `**Country:** ${ipLocation.country}\n**City:** ${ipLocation.city}\n**IP Address:** ${clientIp}`,
          inline: false,
        },
        {
          name: "💻 Device Information",
          value: `**Browser:** ${extractBrowser(deviceInfo.userAgent || "Unknown")}\n**OS:** ${extractOS(deviceInfo.userAgent || "Unknown")}\n**Platform:** ${deviceInfo.platform || "Unknown"}\n**Screen:** ${deviceInfo.screenResolution || "Unknown"}\n**Color Depth:** ${deviceInfo.screenColorDepth || "Unknown"}-bit`,
          inline: false,
        },
        {
          name: "🌐 Browser & Language",
          value: `**Language:** ${deviceInfo.language || "Unknown"}\n**Languages:** ${deviceInfo.languages || "Unknown"}`,
          inline: false,
        },
        {
          name: "⚙️ System Information",
          value: `**Timezone:** ${deviceInfo.timezone || "Unknown"}\n**CPU Cores:** ${deviceInfo.hardwareConcurrency || "Unknown"}\n**Device Memory:** ${deviceInfo.deviceMemory || "Unknown"}`,
          inline: false,
        },
        {
          name: "📡 Network Information",
          value: `**Connection Type:** ${networkInfo.effectiveType || "Unknown"}\n**Download Speed:** ${networkInfo.downlink || "Unknown"} Mbps\n**Latency (RTT):** ${networkInfo.rtt || "Unknown"} ms\n**Save Data Mode:** ${networkInfo.saveData || "Unknown"}`,
          inline: false,
        },
        {
          name: "📍 Precise Location (Browser Geolocation)",
          value: `**Latitude:** ${geoInfo.latitude || "N/A"}\n**Longitude:** ${geoInfo.longitude || "N/A"}\n**Accuracy:** ${geoInfo.accuracy || "N/A"}`,
          inline: false,
        },
        {
          name: "📄 Page Information",
          value: `**URL:** ${pageInfo.url || "Unknown"}\n**Referrer:** ${pageInfo.referrer || "Direct"}\n**Viewport:** ${pageInfo.viewport || "Unknown"}`,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "Portfolio Site Visit" },
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Visit webhook error:", error);
    return NextResponse.json({ error: "Failed to send visit webhook" }, { status: 500 });
  }
}

function extractBrowser(userAgent: string): string {
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
}

function extractOS(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Macintosh") || userAgent.includes("Mac OS")) return "macOS";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("Linux")) return "Linux";
  return "Unknown OS";
}