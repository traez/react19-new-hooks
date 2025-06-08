// app/api/visitor-network/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getClientIP(req: NextRequest): string | null {
  // Try multiple headers in order of preference
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip", // Cloudflare
    "x-client-ip",
    "x-forwarded",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, get the first one (original client)
      const ip = value.split(",")[0]?.trim();
      if (ip && isValidIP(ip)) {
        return ip;
      }
    }
  }

  return null;
}

function isValidIP(ip: string): boolean {
  // Basic IP validation (IPv4 and IPv6)
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export async function GET(req: NextRequest) {
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "IP info token not configured" },
      { status: 500 }
    );
  }

  // STEP 1: Get client IP from headers
  const clientIP = getClientIP(req);
  if (!clientIP) {
    return NextResponse.json(
      { error: "Could not determine client IP address" },
      { status: 400 }
    );
  }

  // STEP 2: Query IPinfo API with the client IP
  try {
    const response = await fetch(
      `https://ipinfo.io/${clientIP}/json?token=${token}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "YourApp/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`IPinfo API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Return standardized response
    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      location: data.loc,
      isp: data.org,
      timezone: data.timezone,
    });
  } catch (error) {
    console.error("Error fetching visitor IP info:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitor network information" },
      { status: 500 }
    );
  }
}
