import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/#events">Events</Link>
          <Link href="/events/create">Create Event</Link>
          <ThemeToggle />
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
