import React from "react";
import { Theme, ThemeOption } from "@types";

interface ThemeButtonProps {
  option: ThemeOption;
  handleThemeChange: (newTheme: Theme) => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  option,
  handleThemeChange
}) => {
  const backgroundColor =
    option.value === "light"
      ? "#f0f0f0"
      : option.value === "dark"
      ? "#333333"
      : option.value === "white"
      ? "#ffffff"
      : option.value === "grayscale"
      ? "#808080"
      : "#000000";

  const color =
    option.value === "dark" || option.value === "black" ? "#ffffff" : "#000000";

  return (
    <button
      className="py-2 px-4 border-black rounded-xl"
      onClick={() => handleThemeChange(option.value)}
      style={{ backgroundColor, color }}
    >
      {option.vietnameseName}
    </button>
  );
};

export default ThemeButton;
