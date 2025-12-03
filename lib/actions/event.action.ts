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
    return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
  } catch (error) {
    console.error(`Error fetching similar events for slug ${slug}:`, error);
    return [];
  }
};

import { uploadToCloudinary } from "../cloudinary";
import { revalidatePath } from "next/cache";

export const createEvent = async (prevState: any, formData: FormData) => {
  try {
    await dbConnect();

    const imageFile = formData.get("image") as File;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = (await uploadToCloudinary(imageFile)) || "";
    }

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
      location: formData.get("location"),
      venue: formData.get("venue"),
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      audience: formData.get("audience"),
      organizer: formData.get("organizer"),
      tags: JSON.parse(formData.get("tags") as string),
      agenda: JSON.parse(formData.get("agenda") as string),
      image: imageUrl,
    };

    const newEvent = await Event.create(eventData);

    revalidatePath("/");
    return { success: true, message: "Event created successfully!", eventId: newEvent._id.toString() };
  } catch (error: any) {
    console.error("Error creating event:", error);
    return { success: false, message: error.message || "Failed to create event" };
  }
};
