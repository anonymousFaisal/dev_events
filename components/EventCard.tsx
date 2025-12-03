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
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
      <Link href={`/events/${slug}`} className="event-card block h-full">
        <div className="overflow-hidden rounded-lg">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full w-full">
            <Image src={image} alt={title} width={410} height={300} className="poster object-cover w-full h-[300px]" />
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/icons/pin.svg" alt={location} width={14} height={14} />
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <p className="title text-xl font-semibold line-clamp-1">{title}</p>
          <div className="datetime flex flex-row flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Image src="/icons/calendar.svg" alt={date} width={14} height={14} />
              <p>{date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/calendar.svg" alt={time} width={14} height={14} />
              <p>{time}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
