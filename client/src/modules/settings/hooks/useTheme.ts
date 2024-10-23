import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../core/store";
import { toggleDarkTheme } from "../../common/store/theme.slice";

export const useTheme = () => {
  const darkTheme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const isDarkTheme = !!localStorage.getItem("theme");

  const setDarkTheme = useCallback(() => {
    dispatch(toggleDarkTheme(true));
    document.documentElement.classList.add("dark");
  }, []);

  const handleToggleDarkTheme = useCallback(() => {
    dispatch(toggleDarkTheme(!darkTheme));
    document.documentElement.classList.toggle("dark");

    if (darkTheme) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, [darkTheme]);

  return { darkTheme, isDarkTheme, setDarkTheme, handleToggleDarkTheme };
};
