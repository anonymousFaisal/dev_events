"use client";
import React from "react";
import Image from "next/image";

const ExploreBtn = () => {
  const handleScroll = () => {
    const eventsSection = document.getElementById("events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
      // Update URL without jumping
      window.history.pushState(null, "", "#events");
    }
  };

  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleScroll} aria-label="Explore Events">
      Explore Events
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
    </button>
  );
};

export default ExploreBtn;
