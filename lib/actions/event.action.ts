"use server";
import Event from "@/database/event.model";
import dbConnect from "../mongodb";

export const getAllEvents = async () => {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug });
    return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
  } catch {
    return [];
  }
};
