import { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../ClickOutside";
import { ArrowDownZA } from "lucide-react";

const DropDownFilter = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="z-99999">
        <Link
          onClick={() => {
            setFilter(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <ArrowDownZA />
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Lọc theo</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      Edit your information in a swipe
                    </span>{" "}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className="text-xs">12 May, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      It is a long established fact
                    </span>{" "}
                    that a reader will be distracted by the readable.
                  </p>

                  <p className="text-xs">24 Feb, 2025</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropDownFilter;
