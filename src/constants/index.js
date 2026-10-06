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
  { id: 6, name: "Terminal", img: "/icons/terminal.png", open: false},
  // { id: 2, name:"VS Code", img:},
  { id: 8, name: "Trash", img: "/icons/trash.png", open: true},
];


export const abt = [
  {
    id: 201,
    name: "Resume",
    icon: "/icons/file.png",
  },
];

export const trsh = [];

export const projectItems = [
  { id: 101, name: "Project One", icon: "/icons/folder.png" },
  { id: 102, name: "Project Two", icon: "/icons/folder.png" },
];

export const sidebar = [
  { id: "projects", name: "Projects", type: "folder", items: projectItems },
  { id: "about", name: "About", type: "folder", items: abt },
  { id: "trash", name: "Trash", type: "folder", items: trsh },
];


export const COLORS = {
  windowBg: "rgba(30, 30, 32, 0.97)",
  border: "rgba(255, 255, 255, 0.08)",
  titleBarBg: "rgba(40, 40, 44, 0.97)",
  titleBarBgInactive: "rgba(28, 28, 30, 0.97)",
  textPrimary: "rgba(255, 255, 255, 0.92)",
  textSecondary: "rgba(255, 255, 255, 0.55)",
  hoverBg: "rgba(255, 255, 255, 0.08)",
};

export const WINDOW_CONFIG = {
  WINDOW_WIDTH: 480,
  WINDOW_HEIGHT: 360,
  MIN_WIDTH: 280,
  MIN_HEIGHT: 200,
  CASCADE_OFFSET: -30,
};