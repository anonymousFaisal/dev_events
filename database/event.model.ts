import { Schema, Document, models, model } from "mongoose";
import slugify from "slugify";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Pre-validate hook for slug generation and date validation
EventSchema.pre("validate", async function (this: IEvent) {
  // Generate slug if title is modified
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Validate and normalize date
  if (this.isModified("date")) {
    // Ensure date is stored as YYYY-MM-DD string
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.date)) {
      // Try to parse if it's not already in YYYY-MM-DD
      const dateObj = new Date(this.date);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }
      this.date = dateObj.toISOString().split("T")[0];
    }
  }

  // Ensure time is consistent (simple check, can be expanded)
  if (this.isModified("time") && !this.time) {
    throw new Error("Time is required");
  }
});

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
