"use server";

import Booking from "@/database/booking.model";
import dbConnect from "../mongodb";

import mongoose from "mongoose";

export const getBookingCountByEventId = async (eventId: mongoose.Types.ObjectId) => {
  try {
    await dbConnect();
    const count = await Booking.countDocuments({ eventId });
    return { count };
  } catch (error) {
    console.error("Error fetching booking count:", error);
    return { count: 0, error: error as Error };
  }
};
