'use client';

import { createContext, useContext, useState, useMemo } from 'react';

/**
 * @typedef {Object} ThemeColors
 * @property {string} windowBg
 * @property {string} border
 * @property {string} titleBarBg
 * @property {string} titleBarBgInactive
 * @property {string} textPrimary
 * @property {string} textSecondary
 * @property {string} hoverBg
 * @property {string} urlBarBg
 * @property {string} overlayBg
 */

/** @type {ThemeColors} */
export const darkTheme = {
  windowBg: 'rgba(30, 30, 32, 0.85)',
  border: 'rgba(255, 255, 255, 0.08)',
  titleBarBg: 'rgba(40, 40, 44, 0.9)',
  titleBarBgInactive: 'rgba(28, 28, 30, 0.9)',
  textPrimary: 'rgba(255, 255, 255, 0.92)',
  textSecondary: 'rgba(255, 255, 255, 0.55)',
  hoverBg: 'rgba(255, 255, 255, 0.08)',
  urlBarBg: 'rgba(255, 255, 255, 0.06)',
  overlayBg: 'rgba(24, 24, 26, 1)',
};

/** @type {ThemeColors} */
export const lightTheme = {
  windowBg: 'rgba(255, 255, 255, 0.85)',
  border: 'rgba(0, 0, 0, 0.08)',
  titleBarBg: 'rgba(246, 246, 248, 0.9)',
  titleBarBgInactive: 'rgba(236, 236, 238, 0.9)',
  textPrimary: 'rgba(0, 0, 0, 0.88)',
  textSecondary: 'rgba(0, 0, 0, 0.55)',
  hoverBg: 'rgba(0, 0, 0, 0.06)',
  urlBarBg: 'rgba(0, 0, 0, 0.04)',
  overlayBg: 'rgba(255, 255, 255, 1)',
};

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isDark
 * @property {ThemeColors} colors
 * @property {() => void} toggleTheme
 */

const ThemeContext = createContext(null);

/**
 * @param {{ children: import('react').ReactNode, defaultDark?: boolean }} props
 */
export function ThemeProvider({ children, defaultDark = true }) {
  const [isDark, setIsDark] = useState(defaultDark);

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkTheme : lightTheme,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Returns the theme context, or `null` if there's no provider (callers -
 * like Window.jsx - fall back to `darkTheme` in that case).
 * @returns {ThemeContextValue | null}
 */
export function useThemeOptional() {
  return useContext(ThemeContext);
}

/**
 * Same as useThemeOptional, but throws if there's no provider.
 * @returns {ThemeContextValue}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
