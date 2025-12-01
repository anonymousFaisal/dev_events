import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Await params
    const { slug } = await params;

    // 3. Validate slug presence
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 4. Fetch the event by slug
    const event = await Event.findOne({ slug: slug.toLowerCase() });

    // 5. Handle event not found
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 6. Return the event data
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
