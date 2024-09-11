import React from "react";
import { Theme, ThemeOption } from "@types";
import ThemeButton from "./ThemeButton";

interface PopoverProps {
  themeOptions: ThemeOption[];
  handleThemeChange: (newTheme: Theme) => void;
}

const ThemePopover: React.FC<PopoverProps> = ({
  themeOptions,
  handleThemeChange
}) => {
  return (
    <div className="absolute top-20 right-10 z-99999 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-2">
        {themeOptions.map((option) => (
          <ThemeButton
            key={option.value}
            option={option}
            handleThemeChange={handleThemeChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemePopover;
