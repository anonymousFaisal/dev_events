import React from "react";
import { getAllEventsWithBookingCount } from "@/lib/actions/event.action";
import EventBlock from "@/components/EventBlock";

interface EventItem {
  _id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  tags: string[];
  bookingCount: number;
}

const EventsPage = async () => {
  const events = await getAllEventsWithBookingCount();

  return (
    <section className="container mx-auto px-4 py-10 pt-28 min-h-screen">
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-schibsted-grotesk">All Events</h1>
          <p className="text-muted-foreground text-lg">Explore our upcoming developer events and workshops.</p>
        </div>

        <div className="flex flex-col gap-6">
          {events && events.length > 0 ? (
            events.map((event: EventItem) => <EventBlock key={String(event._id)} {...event} />)
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No events found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
