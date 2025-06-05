import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const headers = request.headers;
  const ip =
    headers.get("x-forwarded-for") || headers.get("x-real-ip") || "Unknown";

  // Initialize location data
  let country = "Unknown";
  let region = "Unknown";
  let city = "Unknown";

  // Simple IP-based geolocation (mock example)
  if (ip !== "Unknown") {
    // This is a mock implementation - replace with real geolocation in production
    const ipParts = ip.split(".");
    const firstOctet = parseInt(ipParts[0]);

    if (firstOctet < 50) {
      country = "US";
      region = "North America";
      city = "Cloud Provider"; // Often indicates AWS/GCP data centers
    } else if (firstOctet < 100) {
      country = "UK";
      region = "Europe";
      city = "London";
    } else {
      country = "Other";
    }
  }

  const serverFingerprint = {
    network: {
      ip, // Now showing full unmasked IP
      country,
      region,
      city,
    },
    request: {
      method: request.method,
      userAgent: headers.get("user-agent"),
      acceptLanguage: headers.get("accept-language"),
      referrer: headers.get("referer"),
      host: headers.get("host"),
    },
    deployment: {
      environment: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(serverFingerprint);
}
