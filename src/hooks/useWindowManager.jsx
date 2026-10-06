"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { createClosedState, createOpenState, isWindowOpen } from "../types/types";

export function useWindowManager(windowConfigs) {

  const nextZIndexRef = useRef(1);

  const [windowStates, setWindowStates] = useState(() => {
    const initial = new Map();
    for (const config of windowConfigs) {
      initial.set(config.id, createClosedState());
    }
    return initial;
  });

const openWindow = useCallback((id, data) => {
  setWindowStates((prev) => {
    const current = prev.get(id);
    if (!current) {
      console.warn(`useWindowManager: Window "${id}" not found`);
      return prev;
    }

    const isOpen = isWindowOpen(current);
    if (isOpen && current.isActive && data === undefined) return prev;

    const next = new Map(prev);
    for (const [windowId, state] of next) {
      if (isWindowOpen(state) && state.isActive) {
        next.set(windowId, { ...state, isActive: false });
      }
    }

    const zIndex =
      isOpen && current.isActive ? current.zIndex : nextZIndexRef.current++;
    next.set(
      id,
      createOpenState(
        true,
        zIndex,
        data ?? (isOpen ? current.data : undefined),
      ),
    );
    return next;
  });
}, []);

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
