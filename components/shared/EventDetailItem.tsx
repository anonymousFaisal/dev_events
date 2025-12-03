import React from "react";
import Image from "next/image";

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-200/50">
        <Image src={icon} alt={alt} width={16} height={16} className="opacity-80" />
      </div>
      <p className="text-light-200 font-medium">{label}</p>
    </div>
  );
};

export default EventDetailItem;
