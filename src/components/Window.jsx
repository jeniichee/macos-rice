"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { isWindowOpen } from "../types/types.js";
import { COLORS, WINDOW_CONFIG } from "../constants/index.js";
import Finder from "../windows/Finder.jsx";

export function Window({ config, state, actions, cascadeIndex = 0 }) {
  const isOpen = isWindowOpen(state);
  const isActive = isOpen && state.isActive;
  const zIndex = isOpen ? state.zIndex : 0;
  const offset = cascadeIndex * WINDOW_CONFIG.CASCADE_OFFSET;

  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") {
      return { x: 100 + offset, y: 80 + offset };
    }
    return {
      x: Math.max(
        20,
        (window.innerWidth - WINDOW_CONFIG.WINDOW_WIDTH) / 2 + offset,
      ),
      y: Math.max(
        20,
        (window.innerHeight - WINDOW_CONFIG.WINDOW_HEIGHT) / 2 - 40 + offset,
      ),
    };
  });

  const [size, setSize] = useState({
    width: WINDOW_CONFIG.WINDOW_WIDTH,
    height: WINDOW_CONFIG.WINDOW_HEIGHT,
  });

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const handleTitleMouseDown = useCallback(
    (e) => {
      dragRef.current = {
        dragging: true,
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
    },
    [position],
  );

  useEffect(() => {
    function handleMouseMove(e) {
      if (!dragRef.current.dragging) return;
      setPosition({
        x: dragRef.current.originX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.originY + (e.clientY - dragRef.current.startY),
      });
    }
    function handleMouseUp() {
      dragRef.current.dragging = false;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const resizeRef = useRef({
    resizing: false,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startPosX: 0,
    startPosY: 0,
  });

  const handleResizeMouseDown = useCallback(
    (e, direction) => {
      e.stopPropagation();
      e.preventDefault();
      actions.focus();
      resizeRef.current = {
        resizing: true,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: size.width,
        startHeight: size.height,
        startPosX: position.x,
        startPosY: position.y,
      };
    },
    [actions, size, position],
  );

  useEffect(() => {
    function handleResizeMouseMove(e) {
      const r = resizeRef.current;
      if (!r.resizing) return;

      const dx = e.clientX - r.startX;
      const dy = e.clientY - r.startY;
      const dir = r.direction;

      let nextWidth = r.startWidth;
      let nextHeight = r.startHeight;
      let nextX = r.startPosX;
      let nextY = r.startPosY;

      if (dir.includes("right")) {
        nextWidth = Math.max(WINDOW_CONFIG.MIN_WIDTH, r.startWidth + dx);
      }
      if (dir.includes("left")) {
        nextWidth = Math.max(WINDOW_CONFIG.MIN_WIDTH, r.startWidth - dx);
        nextX = r.startPosX + (r.startWidth - nextWidth);
      }
      if (dir.includes("bottom")) {
        nextHeight = Math.max(WINDOW_CONFIG.MIN_HEIGHT, r.startHeight + dy);
      }
      if (dir.includes("top")) {
        nextHeight = Math.max(WINDOW_CONFIG.MIN_HEIGHT, r.startHeight - dy);
        nextY = r.startPosY + (r.startHeight - nextHeight);
      }

      setSize({ width: nextWidth, height: nextHeight });
      setPosition({ x: nextX, y: nextY });
    }

    function handleResizeMouseUp() {
      resizeRef.current.resizing = false;
    }

    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed rounded-xl overflow-hidden shadow-2xl flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        backgroundColor: COLORS.windowBg,
        border: `1px solid ${COLORS.border}`,
      }}
      onMouseDownCapture={actions.focus}
    >
      <div
        className="flex items-center gap-2 px-3 h-10 shrink-0 cursor-move select-none"
        style={{
          backgroundColor: isActive
            ? COLORS.titleBarBg
            : COLORS.titleBarBgInactive,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
        onMouseDown={handleTitleMouseDown}
      >
        <button
          onClick={actions.close}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          aria-label="Close"
        />
        <span
          className="ml-2 text-sm font-medium truncate"
          style={{ color: COLORS.textPrimary }}
        >
          {config.name}
        </span>
      </div>
      <div
        className="flex-1 overflow-auto"
        style={{ color: COLORS.textPrimary }}
      >
        <WindowContent id={config.id} data={state.data} />;
      </div>

      <div
        className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
      />
      <div
        className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "top")}
      />
      <div
        className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
      />
      <div
        className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "left")}
      />
      <div
        className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize"
        onMouseDown={(e) => handleResizeMouseDown(e, "right")}
      />
    </div>
  );
}

function WindowContent({ id, data }) {
  const Content = CONTENT_MAP[id];
  if (!Content) {
    return (
      <div className="p-4 text-sm" style={{ color: COLORS.textSecondary }}>
        No content registered for window id {id}.
      </div>
    );
  }
  return <Content {...data} />;
}

const CONTENT_MAP = {
  3: () => <div className="p-4">Contact form goes here.</div>,
  5: Finder,
};
