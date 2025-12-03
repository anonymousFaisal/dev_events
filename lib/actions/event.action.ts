"use server";
import Event from "@/database/event.model";
import dbConnect from "../mongodb";

export const getAllEvents = async () => {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
};

export const getAllEventsWithBookingCount = async () => {
  try {
    await dbConnect();
    const events = await Event.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "eventId",
          as: "bookings",
        },
      },
      {
        $addFields: {
          bookingCount: { $size: "$bookings" },
        },
      },
      {
        $project: {
          bookings: 0,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching all events with booking count:", error);
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
    return null;
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug });
    if (!event) return [];
    const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    return JSON.parse(JSON.stringify(similarEvents));
  } catch (error) {
    console.error(`Error fetching similar events for slug ${slug}:`, error);
    return [];
  }
};

import { uploadToCloudinary } from "../cloudinary";
import { revalidatePath } from "next/cache";

export interface CreateEventState {
  success: boolean;
  message: string;
  eventId?: string;
  slug?: string;
}

export const createEvent = async (prevState: CreateEventState, formData: FormData): Promise<CreateEventState> => {
  try {
    await dbConnect();

    const imageFile = formData.get("image") as File;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = (await uploadToCloudinary(imageFile)) || "";
    }

    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      overview: formData.get("overview") as string,
      location: formData.get("location") as string,
      venue: formData.get("venue") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      mode: formData.get("mode") as string,
      audience: formData.get("audience") as string,
      organizer: formData.get("organizer") as string,
      tags: JSON.parse(formData.get("tags") as string),
      agenda: JSON.parse(formData.get("agenda") as string),
      image: imageUrl,
    };

    const newEvent = await Event.create(eventData);

    revalidatePath("/");
    return { success: true, message: "Event created successfully!", eventId: newEvent._id.toString(), slug: newEvent.slug };
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create event";
    return { success: false, message: errorMessage };
  }
};
