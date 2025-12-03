import React from "react";

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold font-schibsted-grotesk">Agenda</h2>
      <div className="flex flex-col gap-3">
        {agendaItems.map((item, index) => (
          <div key={item} className="flex items-start gap-4 p-4 bg-dark-100 rounded-xl border border-dark-200">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
              {index + 1}
            </span>
            <p className="text-light-200 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAgenda;
