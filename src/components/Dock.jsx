import React from "react";
import { dockApps } from "../constants";
import { useDesktopContext } from "../contexts/DesktopContext";

const Dock = () => {
  const { openWindow } = useDesktopContext();

  const openApp = (app) => {
    openWindow(app.id);
  };

  return (
    <section id="dock">
      <div className="dock-container">
        {dockApps.map(({ id, name, img }) => (
          <div key={id}>
            <button onClick={() => openApp({ id })}>
              <div className="dock-item">
                <img src={img} alt={name} className="dock-icon" />
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dock;
