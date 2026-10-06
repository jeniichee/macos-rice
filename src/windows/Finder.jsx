import React, { useState } from "react";
import { sidebar } from "../constants";

const Finder = () => {
  const [activeLocation, setActiveLocation] = useState(sidebar[0]);

  return (
    <section id="finder" className="flex h-full">
      <aside className="sidebar">
        {sidebar.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocation(location)}
            className={
              activeLocation.id === location.id
                ? "w-full rounded px-3 py-2 text-left bg-blue-500 text-white"
                : "w-full rounded px-3 py-2 text-left hover:bg-gray-200"
            }
          >
            <h3>{location.name}</h3>
          </button>
        ))}
      </aside>

      <main className="flex-1 p-4">
        <h2 className="text-lg font-semibold">{activeLocation.name}</h2>

        <div className="mt-4 grid grid-cols-4 gap-4">
          {activeLocation.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-2 rounded hover:bg-gray-100"
            >
              <img src={item.icon} alt={item.name} className="w-12 h-12" />

              <p className="mt-1 text-sm truncate">{item.name}</p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Finder;
