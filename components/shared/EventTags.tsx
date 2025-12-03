import React from "react";

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {tags.map((tag) => (
        <div
          key={tag}
          className="bg-primary/70 hover:bg-primary transition-opacity text-black text-xs font-bold rounded-full px-4 py-1.5 cursor-default"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default EventTags;
