import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/actions/event.action";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // 1. Await params
    const { slug } = await params;

    // 2. Validate slug presence
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 3. Fetch the event by slug
    const event = await getEventBySlug(slug);

    // 4. Handle event not found
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 5. Return the event data
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
