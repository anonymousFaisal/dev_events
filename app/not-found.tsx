import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex-center min-h-screen w-full flex-col gap-4">
      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <p className="text-light-200">The page you are looking for does not exist.</p>
      <Link href="/" className="rounded-md bg-primary px-4 py-2 text-black font-semibold hover:bg-primary/90">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
