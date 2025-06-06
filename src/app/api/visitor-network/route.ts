// app/api/visitor-network/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "IP info token not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://ipinfo.io/json?token=${token}`);
    if (!response.ok) {
      throw new Error(`IP info API responded with ${response.status}`);
    }
    const data = await response.json();

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
