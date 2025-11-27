import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-validate hook to validate event existence and email format
BookingSchema.pre("validate", async function (this: IBooking) {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    throw new Error("Invalid email format");
  }

  // Validate event existence
  if (this.isModified("eventId")) {
    const Event = mongoose.models.Event || mongoose.model("Event");
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      throw new Error("Event not found");
    }
  }
});

BookingSchema.index({ eventId: 1 });

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
