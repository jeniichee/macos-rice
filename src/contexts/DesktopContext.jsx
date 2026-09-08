/**
 * ============================================================================
 * DESKTOP CONTEXT
 * ============================================================================
 *
 * Provides window management (windows map + open/close/focus actions) to
 * all children.
 *
 * @packageDocumentation
 */

"use client";

import { createContext, useContext } from "react";

/**
 * @typedef {Object} DesktopContextValue
 * @property {Map<string|number, {config: object, state: object, actions: object}>} windows
 * @property {(id: string|number) => void} openWindow
 * @property {(id: string|number) => void} closeWindow
 * @property {(id: string|number) => void} focusWindow
 */

const DesktopContext = createContext(null);

/**
 * @param {{ children: import('react').ReactNode, value: DesktopContextValue }} props
 */
export function DesktopProvider({ children, value }) {
  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}

/**
 * Hook to access the desktop context.
 * Returns safe no-op defaults when used outside a DesktopProvider.
 *
 * @returns {DesktopContextValue}
 */
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

/**
 * Hook to get a specific window's instance by ID.
 *
 * @param {string|number} windowId
 */
export function useWindow(windowId) {
  const { windows } = useDesktopContext();
  return windows.get(windowId);
}

export { DesktopContext };
