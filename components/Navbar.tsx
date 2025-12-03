"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Create Event", href: "/events/create" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav className="relative flex items-center justify-between px-6 py-3 w-full">
        <Link href="/" className="flex items-center gap-2 group z-50">
          <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image src="/icons/logo.png" alt="Logo" width={28} height={28} />
          </motion.div>
          <p className="text-xl font-bold italic bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            DevEvents
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 list-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    isActive ? "text-primary-foreground" : "text-foreground/80 hover:text-foreground"
                  )}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {/* Background Pill for Active State */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-primary/80 backdrop-blur-md rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Hover Effect */}
                  {hoveredPath === link.href && !isActive && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-muted/50 backdrop-blur-sm rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {link.name}
                </Link>
              </li>
            );
          })}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <ThemeToggle />
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-black rounded-2xl shadow-xl border border-border flex flex-col gap-2 md:hidden overflow-hidden"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-center font-medium transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
