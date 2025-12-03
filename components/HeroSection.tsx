"use client";

import React from "react";
import ExploreBtn from "./ExploreBtn";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center pt-32">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-6xl font-bold max-sm:text-4xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        The Hub for Every Developer <br /> Event You Can&apos;t Miss
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-5 text-lg text-muted-foreground"
      >
        Hackathons, Meetups, and Conferences, All in One Place
      </motion.p>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-8">
        <ExploreBtn />
      </motion.div>
    </div>
  );
};

export default HeroSection;
