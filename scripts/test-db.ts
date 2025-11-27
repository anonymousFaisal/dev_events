import dotenv from "dotenv";
dotenv.config({ path: ".env" });

async function main() {
  // Dynamic imports to ensure env vars are loaded first
  const { default: dbConnect } = await import("../lib/mongodb");
  const { Event, Booking } = await import("../database");

  console.log("1. Connecting to database...");
  await dbConnect();
  console.log("   Connected!");

  console.log("2. Creating test event...");
  const eventData = {
    title: "Test Event " + Date.now(),
    description: "A test event description",
    overview: "Overview of the test event",
    image: "https://example.com/image.jpg",
    venue: "Test Venue",
    location: "Test Location",
    date: new Date().toISOString(),
    time: "10:00 AM",
    mode: "offline",
    audience: "Developers",
    agenda: ["Introduction", "Coding"],
    organizer: "Test Organizer",
    tags: ["test", "db"],
  };

  const event = await Event.create(eventData);
  console.log("   Event created:", event.title, event.slug);

  console.log("3. Creating test booking...");
  const bookingData = {
    eventId: event._id,
    email: "test@example.com",
  };

  const booking = await Booking.create(bookingData);
  console.log("   Booking created for:", booking.email);

  console.log("4. Cleaning up...");
  await Booking.findByIdAndDelete(booking._id);
  await Event.findByIdAndDelete(event._id);
  console.log("   Cleanup done.");

  console.log("SUCCESS: Database layer is working correctly!");
  process.exit(0);
}

main().catch((err) => {
  console.error("FAILURE:", err);
  process.exit(1);
});
