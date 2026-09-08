export { Window } from "../components/Window.jsx";
export {
  DesktopContext,
  DesktopProvider,
  useDesktopContext,
  useWindow,
} from "./contexts/DesktopContext.jsx";
export { useWindowManager } from "./hooks/useWindowManager.jsx";
export {
  isWindowClosed,
  isWindowOpen,
  createClosedState,
  createOpenState,
} from "./types.js";
