import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div key={tag} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  'use cache';
  cacheLife("hours");
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const event = await request.json();

  if (!event) return notFound();

  const bookings = 10;
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

export default EventDetailsPage;
