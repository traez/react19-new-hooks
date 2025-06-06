// app/api/generate-visitor-id/route.ts
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { fingerprint } = await req.json();

    // Create hash from the most stable device characteristics
    const hashInput = {
      os: fingerprint.osModel,
      cores: fingerprint.hardwareConcurrency,
      resolution: fingerprint.windowInnerResolution,
      timezone: fingerprint.timezone,
      // Never include IP in the hash for privacy
    };

    const visitorId = createHash("sha256")
      .update(JSON.stringify(hashInput))
      .digest("hex")
      .substring(0, 16); // First 16 chars for readability

    return NextResponse.json({ visitorId });
  } catch (error) {
    console.error("Hashing error:", error);
    return NextResponse.json(
      { error: "Failed to generate visitor ID" },
      { status: 500 }
    );
  }
}
