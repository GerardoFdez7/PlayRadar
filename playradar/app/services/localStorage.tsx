// Constantes para el modo oscuro
const DARK_MODE_KEY = "modoOscuro";

// Funciones para manejar el modo oscuro
export const getModoOscuro = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DARK_MODE_KEY) === "true";
};

export const setModoOscuro = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem(DARK_MODE_KEY, isDark.toString());
};

export const toggleModoOscuro = (): boolean => {
  const newMode = !getModoOscuro();
  setModoOscuro(newMode);
  return newMode;
};
