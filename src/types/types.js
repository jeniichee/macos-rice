/**
 * ============================================================================
 * DESKTOP UI - SHARED TYPES & RUNTIME HELPERS (JavaScript)
 * ============================================================================
 *
 * A window is just { id, name, type }:
 *  - id:   unique identifier
 *  - name: shown in the window's title bar
 *  - type: which content to render inside the window
 *          (see CONTENT_MAP in components/Window.jsx)
 *
 * @packageDocumentation
 */

/**
 * @typedef {Object} WindowConfig
 * @property {string|number} id - Unique identifier for the window
 * @property {string} name - Title shown in the window's title bar
 * @property {string} type - Which content to render inside the window
 */

/**
 * @typedef {{status: 'closed'}} ClosedWindowState
 * @typedef {{status: 'open', isActive: boolean, zIndex: number}} OpenWindowState
 * @typedef {ClosedWindowState | OpenWindowState} WindowState
 */

/**
 * @returns {ClosedWindowState}
 */
export function createClosedState() {
  return { status: "closed" };
}

/**
 * @param {boolean} [isActive=true]
 * @param {number} [zIndex=1]
 * @returns {OpenWindowState}
 */
export function createOpenState(isActive = true, zIndex = 1) {
  return { status: "open", isActive, zIndex };
}

/**
 * @param {WindowState} state
 * @returns {boolean}
 */
export function isWindowClosed(state) {
  return state.status === "closed";
}

/**
 * @param {WindowState} state
 * @returns {boolean}
 */
export function isWindowOpen(state) {
  return state.status === "open";
}
