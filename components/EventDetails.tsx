import { notFound } from "next/navigation";
import React from "react";
import mongoose from "mongoose";
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

  const { count: bookings } = await getBookingCountByEventId(new mongoose.Types.ObjectId(event._id));
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  return (
    <section id="event" className="w-full pt-5">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-12">
        <Image src={event.image} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex flex-col gap-4 max-w-4xl">
            <EventTags tags={event.tags || []} />
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={event.date} />
              <EventDetailItem icon="/icons/pin.svg" alt="location" label={event.location} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Main Content Left side */}
        <div className="flex-1 flex flex-col gap-10 w-full">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-schibsted-grotesk">Overview</h2>
            <p className="text-light-200 leading-relaxed text-lg">{event.description}</p>
          </section>

          <section className="flex flex-col gap-6 p-6 bg-dark-100 rounded-xl border border-dark-200">
            <h2 className="text-xl font-bold font-schibsted-grotesk">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={event.date} />
              <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
              <EventDetailItem icon="/icons/pin.svg" alt="location" label={event.location} />
              <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
              <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
            </div>
          </section>

          <EventAgenda agendaItems={event.agenda || []} />

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-schibsted-grotesk">About the Organizer</h2>
            <div className="p-6 bg-dark-100 rounded-xl border border-dark-200">
              <p className="text-light-200">{event.organizer}</p>
            </div>
          </section>
        </div>

        {/* Booking form Right side - Sticky */}
        <aside className="w-full lg:w-[400px] sticky top-24">
          <div className="bg-dark-100 border border-dark-200 card-shadow flex w-full flex-col gap-6 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold font-schibsted-grotesk">Book Your Spot</h2>
              {bookings > 0 ? (
                <p className="text-sm text-primary">Join {bookings} people who have already booked</p>
              ) : (
                <p className="text-sm text-light-200">Be the first to book this event</p>
              )}
            </div>
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      {similarEvents.length > 0 && (
        <div className="flex w-full flex-col gap-8 pt-20 border-t border-dark-200 mt-20">
          <h2 className="text-3xl font-bold font-schibsted-grotesk">Similar Events</h2>
          <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
            {similarEvents.map((similar: IEvent) => (
              <EventCard key={`${similar._id}`} {...similar} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EventDetails;
