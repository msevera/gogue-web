import { NextResponse } from "next/server";
import { getMongoDb, type EarlyAccessSubmission } from "@/utils/mongodb";
import { cookies } from "next/headers";
import { Analytics } from '@segment/analytics-node'

export async function POST(request: Request) {
  try {
    const analytics = new Analytics({ writeKey: process.env.SEGMENT_WRITE_KEY || '' })
    console.log("SEGMENT_WRITE_KEY", process.env.SEGMENT_WRITE_KEY);
    const { email, name, role, platform, topic } = await request.json();

    if (!email || !name || !role || !platform) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await getMongoDb();
    const collectionName = process.env.MONGODB_EARLY_ACCESS_COLLECTION || "earlyaccesssubmissions";

    const userAgent = request.headers.get("user-agent");
    // X-Forwarded-For may include multiple IPs; take the first
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : null;

    let utm: Record<string, string> | undefined = undefined;
    try {
      const cookieStore = await cookies();
      const utmCookieValue = cookieStore.get("utm_params")?.value;
      if (utmCookieValue) {
        utm = JSON.parse(utmCookieValue);
      }
    } catch {
      // ignore malformed cookies
    }

    const submission: EarlyAccessSubmission = {
      email,
      name,
      role,
      platform,
      topic,
      createdAt: new Date(),
      userAgent,
      ip,
      utm,
    };

    await db.collection<EarlyAccessSubmission>(collectionName).insertOne(submission);

    await analytics.track({
      anonymousId: email,
      event: 'early_access_submitted',
      properties: {
        email,
        name,
        role,
        platform,
        topic,
        utm
      }
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Early access submission error", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


