// navbar
export const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "projects",
    windowId: 5,
    location: "projects",
  },
  { id: 3, name: "Contact", type: "contact" },
];

export const navIcons = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

// todo
export const dockApps = [
  { id: 5, name: "Finder", img: "/icons/finder.png", open: true},
  { id: 6, name: "Terminal", img: "/icons/terminal.png", open: false },
  { id: 7, name: "Contact", img: "/icons/contact.png", open: false},
  // { id: 2, name:"VS Code", img:},
  { id: 5, name: "Trash", img: "/icons/trash.png", open: true},
];


export const abt = [
  {
    id: 201,
    name: "Resume",
    icon: "/icons/pdf.png",
  },
];

export const trsh = [];

export const projectItems = [
  { id: 101, name: "Project One", icon: "/icons/txt.png" },
  { id: 102, name: "Project Two", icon: "/icons/txt.png" },
];

export const sidebar = [
  {
    id: "projects",
    icon: "/icons/projects.svg",
    name: "Projects",
    type: "folder",
    items: projectItems,
  },
  { id: "about", icon: "", name: "About", type: "folder", items: abt },
  { id: "trash", icon: "", name: "Trash", type: "folder", items: trsh },
];

export const WINDOW_CONFIG = {
  WINDOW_WIDTH: 480,
  WINDOW_HEIGHT: 360,
  MIN_WIDTH: 280,
  MIN_HEIGHT: 200,
  CASCADE_OFFSET: -30, 
};

export const RESIZE_DIRECTIONS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top",
  "bottom",
  "left",
  "right",
];