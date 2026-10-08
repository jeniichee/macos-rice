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
            <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold">{activeLocation.name}</h2>
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {activeLocation.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center p-2 rounded hover:bg-[#353537]"
                        >
                            <img src={item.icon} alt={item.name} className="w-12 h-12" />

                            <p className="mt-1 text-sm truncate">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Finder;
