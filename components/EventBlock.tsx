"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  tags: string[];
  bookingCount: number;
}

const EventBlock = ({ title, image, slug, location, date, time, tags, bookingCount }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link
        href={`/events/${slug}`}
        className="block w-full bg-card hover:bg-accent/50 border border-border rounded-xl overflow-hidden transition-colors shadow-sm hover:shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
          {/* Image Section */}
          <div className="w-full md:w-[280px] h-[200px] md:h-[180px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              width={280}
              height={180}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between flex-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold line-clamp-2">{title}</h3>
                <span className="shrink-0 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {bookingCount} {bookingCount === 1 ? "Booking" : "Bookings"}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                  <Image src="/icons/calendar.svg" alt="date" width={16} height={16} />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Image src="/icons/clock.svg" alt="time" width={16} height={16} />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Image src="/icons/pin.svg" alt="location" width={16} height={16} />
                  <span>{location}</span>
                </div>
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventBlock;
