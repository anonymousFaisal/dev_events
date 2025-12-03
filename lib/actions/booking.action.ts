"use server";

import Booking from "@/database/booking.model";
import dbConnect from "../mongodb";

export const getBookingCountByEventId = async (eventId: string) => {
  try {
    await dbConnect();
    const count = await Booking.countDocuments({ eventId });
    return count;
  } catch (error) {
    console.error("Error fetching booking count:", error);
    return 0;
  }
};
