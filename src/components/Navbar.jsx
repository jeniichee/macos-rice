import React, { useEffect } from "react";
import { navIcons, navLinks } from "../constants";

export const Navbar = () => {

  function updateTime() {
    const date = new Date(); 
    let hour = date.getHours(); 
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const time_string = `${hour}:${minutes}:${seconds}`;
    document.getElementById("time").textContent = time_string; 
  }

  useEffect(() => {
    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
      <div>
        <img src="/icons/logo.svg" />
        <p className="font-bold">Jen's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            //   <li key={id} onClick={() => openWindow(type)}>
            <p>{name}</p>
            /* </li> */
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon" />
            </li>
          ))}
        </ul>

        <time id="time">00:00:00</time>
      </div>
    </nav>
  );
};

export default Navbar;
