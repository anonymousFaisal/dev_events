import React from "react";
import { cacheLife } from "next/cache";
import { getAllEvents } from "@/lib/actions/event.action";
import HeroSection from "@/components/HeroSection";
import EventList from "@/components/EventList";

const Home = async () => {
  "use cache";
  cacheLife("hours");
  const events = await getAllEvents();

  return (
    <section>
      <HeroSection />
      <EventList events={events} />
    </section>
  );
};

export default Home;
