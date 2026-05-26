import { NextResponse } from "next/server";

// Function to get client IP address from common proxies
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
    if (ip && ip !== "-" && !isLocalhost(ip)) {
      return ip;
    }
    if (ip && isLocalhost(ip)) {
      return ip;
    }
  }

  return "Unknown";
}

// Function to check if IP is localhost/development
function isLocalhost(ip: string): boolean {
  if (!ip) return true;
  const lowercaseIp = ip.toLowerCase();
  // Check for IPv4 localhost
  if (lowercaseIp === "127.0.0.1" || lowercaseIp === "::1") return true;
  // Check for IPv6-mapped IPv4 localhost
  if (lowercaseIp.includes("::ffff:127.0.0.1") || lowercaseIp.includes("::fff:127.0.0.1")) return true;
  // Check for other localhost patterns
  if (lowercaseIp.includes("localhost") || lowercaseIp === "-") return true;
  return false;
}

async function getPublicIpFromService() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    if (data?.ip) {
      return data.ip;
    }
  } catch (error) {
    console.error("Public IP fallback error:", error);
  }
  return "Unknown";
}

// Function to get geolocation from IP
async function getIpGeolocation(ip: string) {
  try {
    if (isLocalhost(ip)) {
      return {
        country: "Local/Development 🌍",
        city: "Testing Environment",
        flag: "🏠",
      };
    }

    if (ip === "Unknown" && process.env.NODE_ENV === "production") {
      ip = await getPublicIpFromService();
    }

    if (ip === "Unknown") {
      return {
        country: "Unknown",
        city: "Unknown",
        flag: "❓",
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
    const { name, email, message, deviceInfo = {}, networkInfo = {}, pageInfo = {}, geoInfo = {} } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Discord webhook is not configured" },
        { status: 500 }
      );
    }

    // Get IP and location from request
    const clientIp = getClientIp(request);
    const ipLocation = await getIpGeolocation(clientIp);

    // Extract device info
    const browser = deviceInfo.userAgent ? extractBrowser(deviceInfo.userAgent) : "Unknown";
    const os = deviceInfo.userAgent ? extractOS(deviceInfo.userAgent) : "Unknown";

    // Build Discord embed with all information
    const embed = {
      title: `📬 New Portfolio Message from ${name}`,
      description: message,
      color: 3447003, // Blue color
      fields: [
        // Contact Info
        {
          name: "👤 Contact Information",
          value: `**Name:** ${name}\n**Email:** ${email}`,
          inline: false,
        },
        // Location Info
        {
          name: `${ipLocation.flag} Location Information`,
          value: `**Country:** ${ipLocation.country}\n**City:** ${ipLocation.city}\n**IP Address:** ${clientIp}`,
          inline: false,
        },
        // Device Information
        {
          name: "💻 Device Information",
          value: `**Browser:** ${browser}\n**OS:** ${os}\n**Platform:** ${deviceInfo.platform || "Unknown"}\n**Screen:** ${deviceInfo.screenResolution || "Unknown"}\n**Color Depth:** ${deviceInfo.screenColorDepth || "Unknown"}-bit`,
          inline: false,
        },
        // Browser & Language
        {
          name: "🌐 Browser & Language",
          value: `**Language:** ${deviceInfo.language || "Unknown"}\n**Languages:** ${deviceInfo.languages || "Unknown"}`,
          inline: false,
        },
        // System Info
        {
          name: "⚙️ System Information",
          value: `**Timezone:** ${deviceInfo.timezone || "Unknown"}\n**CPU Cores:** ${deviceInfo.hardwareConcurrency || "Unknown"}\n**Device Memory:** ${deviceInfo.deviceMemory || "Unknown"} GB`,
          inline: false,
        },
        // Network Info
        {
          name: "📡 Network Information",
          value: `**Connection Type:** ${networkInfo.effectiveType || "Unknown"}\n**Download Speed:** ${networkInfo.downlink || "Unknown"} Mbps\n**Latency (RTT):** ${networkInfo.rtt || "Unknown"} ms\n**Save Data Mode:** ${networkInfo.saveData || "Off"}`,
          inline: false,
        },
        // Geolocation (if provided by browser)
        {
          name: "📍 Precise Location (Browser Geolocation)",
          value: `**Latitude:** ${geoInfo.latitude || "N/A"}\n**Longitude:** ${geoInfo.longitude || "N/A"}\n**Accuracy:** ${geoInfo.accuracy || "N/A"}`,
          inline: false,
        },
        // Page Info
        {
          name: "📄 Page Information",
          value: `**URL:** ${pageInfo.url || "Unknown"}\n**Referrer:** ${pageInfo.referrer || "Direct"}\n**Viewport:** ${pageInfo.viewport || "Unknown"}`,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Portfolio Contact Form",
      },
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Discord webhook error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper: Extract browser name from user agent
function extractBrowser(userAgent: string): string {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera")) return "Opera";
  return "Unknown Browser";
}

// Helper: Extract OS from user agent
function extractOS(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("Linux")) return "Linux";
  return "Unknown OS";
}
