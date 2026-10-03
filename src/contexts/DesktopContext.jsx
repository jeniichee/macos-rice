"use client";

import { createContext, useContext } from "react";

const DesktopContext = createContext(null);

export function DesktopProvider({ children, value }) {
  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}

export function useDesktopContext() {
  const context = useContext(DesktopContext);

  if (!context) {
    return {
      windows: new Map(),
      openWindow: () => {
        console.warn(
          "useDesktopContext: openWindow called outside Desktop provider",
        );
      },
      closeWindow: () => {
        console.warn(
          "useDesktopContext: closeWindow called outside Desktop provider",
        );
      },
      focusWindow: () => {
        console.warn(
          "useDesktopContext: focusWindow called outside Desktop provider",
        );
      },
    };
  }

  return context;
}

export function useWindow(windowId) {
  const { windows } = useDesktopContext();
  return windows.get(windowId);
}

export { DesktopContext };
