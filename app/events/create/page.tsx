import React from "react";
import CreateEvent from "@/components/CreateEvent";

const CreateEventPage = () => {
  return (
    <main className="min-h-screen w-full bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <CreateEvent />
    </main>
  );
};

export default CreateEventPage;
