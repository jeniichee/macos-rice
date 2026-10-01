import React from 'react'
import { dockApps } from '../constants'

const Dock = () => {
    return (
      <section id="dock">
        <div className="dock-container">
          {dockApps.map(({ id, name, img }) => (
            <div key={id} className="relative flex justify-center">
                <img
                  src={img}
                  alt={name}
                />
            </div>
          ))}
        </div>
      </section>
    );
}

export default Dock