import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleDarkTheme } from "../redux/theme.slice";

export const useTheme = () => {
  const darkTheme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const isDarkTheme = !!localStorage.getItem("theme");

  const setDarkTheme = () => {
    dispatch(toggleDarkTheme(true));
    document.documentElement.classList.add("dark");
  };

  const handleToggleDarkTheme = () => {
    dispatch(toggleDarkTheme(!darkTheme));
    document.documentElement.classList.toggle("dark");

    if (darkTheme) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
    }
  };

  return { darkTheme, isDarkTheme, setDarkTheme, handleToggleDarkTheme };
};
