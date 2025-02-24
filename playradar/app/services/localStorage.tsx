"use client";

const DARK_MODE_KEY = "modoOscuro";

// Get dark mode status
export const getModoOscuro = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DARK_MODE_KEY) === "true";
};

// Set dark mode on document
export const setModoOscuro = (isDark: boolean): void => {
  if (typeof document !== "undefined") {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  localStorage.setItem(DARK_MODE_KEY, isDark.toString());
};

// Toggle dark mode
export const toggleModoOscuro = (): boolean => {
  const newMode = !getModoOscuro();
  setModoOscuro(newMode);
  return newMode;
};

// Apply dark mode immediately when page loads
if (typeof document !== "undefined") {
  setModoOscuro(getModoOscuro());
}
