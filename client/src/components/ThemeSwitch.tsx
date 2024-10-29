import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateSettings } from "../features/settings/settingsSlice";
import { Settings } from "../types/types";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineWbSunny, MdNightlight } from "react-icons/md";

const themes: Array<Settings["theme"]> = ["light", "dark"];

const themeIcons = {
  light: <FaSun />,
  dark: <FaMoon />,
};

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const [theme, setTheme] = useState<Settings["theme"]>("dark");

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    dispatch(updateSettings({ theme: newTheme, currency: settings.currency }));

    const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

    themeToggleDarkIcon?.classList.toggle("hidden");
    themeToggleLightIcon?.classList.toggle("hidden");
  };

  return (
    <button
      id="theme-toggle"
      onClick={handleThemeChange}
      type="button"
      className="dark focus:outline-none focus:ring-4 rounded-lg text-sm p-2.5"
    >
      {theme === "dark" ? themeIcons.light : themeIcons.dark}
    </button>
  );
};

export default ThemeSwitcher;
