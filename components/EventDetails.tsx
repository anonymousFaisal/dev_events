import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug, getEventBySlug } from "@/lib/actions/event.action";
import { getBookingCountByEventId } from "@/lib/actions/booking.action";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";
import EventDetailItem from "@/components/shared/EventDetailItem";
import EventAgenda from "@/components/shared/EventAgenda";
import EventTags from "@/components/shared/EventTags";

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  "use cache";
  cacheLife("hours");
  const slug = await params;
  const event = await getEventBySlug(slug);

  if (!event) return notFound();

  const bookings = await getBookingCountByEventId(event._id);
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* Event Content Left side */}
        <div className="content">
          <Image src={event.image} alt={event.title} width={800} height={800} className="banner" />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={event.date} />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
            <EventDetailItem icon="/icons/pin.svg" alt="location" label={event.location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
          </section>
          <EventAgenda agendaItems={event.agenda || []} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
          <EventTags tags={event.tags || []} />
        </div>
        {/* Booking form Right side */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">Join {bookings} people who have already booked this event</p>
            ) : (
              <p className="text-sm">Be the first to book this event</p>
            )}
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similar: IEvent) => <EventCard key={`${similar._id}`} {...similar} />)}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
