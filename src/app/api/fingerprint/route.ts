import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure this is a dynamic route

export async function GET() {
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "IP info token not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.ipinfo.io/lite/me?token=${token}`
    );
    if (!response.ok) {
      throw new Error(`IP info API responded with ${response.status}`);
    }
    const data = await response.json();

    // Transform the response to include only the fields you want
    const fingerprint = {
      network: {
        ip: data.ip,
        as_name: data.as_name,
        as_domain: data.as_domain,
        country: data.country,
        continent: data.continent,
      },
      deployment: {
        environment: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(fingerprint);
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return NextResponse.json(
      { error: "Failed to fetch IP information" },
      { status: 500 }
    );
  }
}
