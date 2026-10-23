import React, { useState } from "react";
import { sidebar } from "../constants";

const Finder = () => {
    const [activeLocation, setActiveLocation] = useState(sidebar[0]);

    return (
      <section id="finder">
        <aside className="sidebar">
          <h3>Favorites</h3>
          {sidebar.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location)}
              className={activeLocation.id === location.id ? "active" : ""}
            >
              <p className="text-sm truncate">{location.name}</p>
            </button>
          ))}
        </aside>

        {/* content */}
        <div className="content">
          <h2 className="text-lg font-semibold pb-4">{activeLocation.name}</h2>
          <ul>
            {activeLocation.items.map((item) => (
              <li key={item.id}>
                <img src={item.icon} alt={item.name} className="content_icon" />
                <p className="mt-1 text-sm truncate">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
};

export default Finder;
