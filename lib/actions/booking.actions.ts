"use server";

import dbConnect from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
  try {
    await dbConnect();
    await Booking.create({ eventId, slug, email });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false};
  }
};
