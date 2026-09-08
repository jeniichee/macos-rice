/**
 * ============================================================================
 * USE WINDOW MANAGER HOOK
 * ============================================================================
 *
 * Core state management hook for the window system.
 * Manages open/closed state, z-index ordering, and window actions.
 *
 * @packageDocumentation
 */

"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { createClosedState, createOpenState, isWindowOpen } from "../types/types";

/**
 * @typedef {import('../types').WindowConfig} WindowConfig
 */

/**
 * Hook that manages window state for a set of windows.
 *
 * @example
 * ```jsx
 * const windowConfigs = [
 *   { id: 1, name: 'Projects', type: 'finder' },
 * ];
 *
 * function App() {
 *   const manager = useWindowManager(windowConfigs);
 *
 *   return (
 *     <>
 *       <button onClick={() => manager.openWindow(1)}>Open Projects</button>
 *       {Array.from(manager.windows.values()).map(w => (
 *         <Window key={w.config.id} {...w} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 *
 * @param {WindowConfig[]} windowConfigs
 */
export function useWindowManager(windowConfigs) {
  // Track the next z-index to assign (using ref to avoid stale closures)
  const nextZIndexRef = useRef(1);

  const [windowStates, setWindowStates] = useState(() => {
    const initial = new Map();
    for (const config of windowConfigs) {
      initial.set(config.id, createClosedState());
    }
    return initial;
  });

  /**
   * Open a window by ID. If already open, just focuses it.
   */
  const openWindow = useCallback((id) => {
    setWindowStates((prev) => {
      const current = prev.get(id);
      if (!current) {
        console.warn(`useWindowManager: Window "${id}" not found`);
        return prev;
      }
      if (isWindowOpen(current)) return prev;

      const next = new Map(prev);

      // Deactivate all other windows
      for (const [windowId, state] of next) {
        if (isWindowOpen(state) && state.isActive) {
          next.set(windowId, { ...state, isActive: false });
        }
      }

      const zIndex = nextZIndexRef.current++;
      next.set(id, createOpenState(true, zIndex));
      return next;
    });
  }, []);

  /**
   * Close a window by ID.
   */
  const closeWindow = useCallback((id) => {
    setWindowStates((prev) => {
      if (!prev.get(id)) {
        console.warn(`useWindowManager: Window "${id}" not found`);
        return prev;
      }
      const next = new Map(prev);
      next.set(id, createClosedState());
      return next;
    });
  }, []);

  /**
   * Bring a window to the front / mark it active.
   */
  const focusWindow = useCallback((id) => {
    setWindowStates((prev) => {
      const current = prev.get(id);
      if (!current || !isWindowOpen(current) || current.isActive) return prev;

      const next = new Map(prev);

      for (const [windowId, state] of next) {
        if (isWindowOpen(state) && state.isActive) {
          next.set(windowId, { ...state, isActive: false });
        }
      }

      const zIndex = nextZIndexRef.current++;
      next.set(id, { ...current, isActive: true, zIndex });
      return next;
    });
  }, []);

  const createActions = useCallback(
    (windowId) => ({
      open: () => openWindow(windowId),
      close: () => closeWindow(windowId),
      focus: () => focusWindow(windowId),
    }),
    [openWindow, closeWindow, focusWindow],
  );

  const windows = useMemo(() => {
    const result = new Map();
    for (const config of windowConfigs) {
      const state = windowStates.get(config.id) || createClosedState();
      result.set(config.id, {
        config,
        state,
        actions: createActions(config.id),
      });
    }
    return result;
  }, [windowConfigs, windowStates, createActions]);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
  };
}
