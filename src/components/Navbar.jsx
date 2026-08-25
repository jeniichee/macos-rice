import React from 'react';
import { navIcons, navLinks } from '../constants';
// import dayjs from "dayjs";


export const Navbar = () => {
    return (
      <nav>
        <div>
          <img src="/images/logo.svg" />
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
                <img src={img} alt={"icon-${id}"} className="icon" />
              </li>
            ))}
          </ul>

          {/* <time>{dayjs().format("ddd MMM D h:mm A")}</time> */}
        </div>
      </nav>
    );
}

export default Navbar; 
