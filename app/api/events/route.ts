import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/database/event.model";
import { z } from "zod";

// Define Validation Schema
const CreateEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  overview: z.string().min(1, "Overview is required"),
  image: z.string().url("Invalid image URL"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  time: z.string().min(1, "Time is required"),
  mode: z.string().min(1, "Mode is required"),
  audience: z.string().min(1, "Audience is required"),
  agenda: z.array(z.string()).min(1, "At least one agenda item is required"),
  organizer: z.string().min(1, "Organizer is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate input using Zod
    const validationResult = CreateEventSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation Failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Create Event
    const createdEvent = await Event.create(data);

    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}
