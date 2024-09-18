import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import ClickOutside from "../ClickOutside";
import MultiSelectEventTypes from "./MultiSelectEventTypes";

const DropDownFilter = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="z-99999">
        <Link
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border-[0.5px] border-stroke bg-white hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <Filter />
        </Link>

        {dropdownOpen && (
          <div className={`absolute h-full w-90 sm:w-70`}>
            <MultiSelectEventTypes />
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropDownFilter;
