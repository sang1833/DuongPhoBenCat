import React, { useRef, useState } from "react";
import { Layers2 } from "lucide-react";
import { Theme, themeOptions } from "@types";
import Popover from "../Theme/ThemePopover";
import { useOnClickOutside } from "@hooks";

const LayerGroupControl: React.FC<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ theme, setTheme }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => {
    setPopoverVisible((prev) => !prev);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setPopoverVisible(false);
  };

  useOnClickOutside(popoverRef, () => setPopoverVisible(false));

  const currentTheme = themeOptions.find((option) => option.value === theme);

  return (
    <div className="relative">
      <button
        className="absolute py-2 px-2 top-20 lg:top-6 right-6 z-999 grid place-items-center border-slate-300 bg-white rounded-lg shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.7)] border border-transparent cursor-pointer transition-transform duration-500 hover:shadow-[inset_4px_4px_6px_-1px_rgba(0,0,0,0.2),inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.7),-0.5px_-0.5px_0px_rgba(255,255,255,1),0.5px_0.5px_0px_rgba(0,0,0,0.15),0px_12px_10px_-10px_rgba(0,0,0,0.05)] hover:border hover:border-[rgba(0,0,0,0.1)] hover:translate-y-2"
        onClick={togglePopover}
      >
        <span className="w-4 h-4 lg:w-6 lg:h-6 text-slate-700">
          <Layers2 />
        </span>
        <span className="hidden text-slate-800 font-semibold">
          {currentTheme?.vietnameseName}
        </span>
      </button>

      {popoverVisible && (
        <div className="popover-container" ref={popoverRef}>
          <Popover
            themeOptions={themeOptions}
            handleThemeChange={handleThemeChange}
          />
        </div>
      )}
    </div>
  );
};

export default LayerGroupControl;