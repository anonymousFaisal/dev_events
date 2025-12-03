"use client";

import React from "react";
import { IEvent } from "@/database/event.model";
import EventCard from "./EventCard";
import { motion } from "framer-motion";

interface Props {
  events: IEvent[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const EventList = ({ events }: Props) => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mt-20 space-y-7">
      <motion.h3 variants={item} className="text-2xl font-bold font-schibsted-grotesk">
        Featured Events
      </motion.h3>
      <motion.ul variants={container} className="events grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1 list-none">
        {events &&
          events.length > 0 &&
          events.map((event: IEvent) => (
            <motion.li key={String(event._id)} variants={item}>
              <EventCard {...event} />
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};

export default EventList;
