export function createClosedState() {
  return { status: "closed" };
}
export function createOpenState(isActive = true, zIndex = 1, data = undefined) {
  return { status: "open", isActive, zIndex, data };
}
export function isWindowClosed(state) {
  return state.status === "closed";
}
export function isWindowOpen(state) {
  return state.status === "open";
}

