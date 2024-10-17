import React, { useState, useRef, useEffect } from "react";
import { StreetInfo, IStreetSearch } from "../../types";
import { Search, X, ChevronDown } from "lucide-react";
import { towns } from "../../data/towns";
import { getStreetDetail, userSearch } from "../../apis/function";

interface StreetSearchProps {
  onSelectStreet: (street: StreetInfo | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  townFilter: string;
  setTownFilter: (town: string) => void;
}

const StreetSearch: React.FC<StreetSearchProps> = ({
  onSelectStreet,
  searchTerm,
  setSearchTerm,
  townFilter,
  setTownFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredStreets, setFilteredStreets] = useState<IStreetSearch[]>([]);

  // click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await userSearch(searchTerm, townFilter);
      setFilteredStreets(response);
    };

    if (searchTerm.length > 0) {
      const debounceFetch = setTimeout(fetchSearchResults, 300);
      return () => clearTimeout(debounceFetch);
    }
  }, [searchTerm, townFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const fetchStreetDetail = async (streetId: number) => {
    const response = await getStreetDetail(streetId);
    return response as StreetInfo;
  };

  const handleSelectStreet = async (streetId: number) => {
    const street = await fetchStreetDetail(streetId);
    onSelectStreet(street);
    setSearchTerm(street.streetName);
    setTownFilter(street.address.split(", ")[1]);
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSelectStreet(null);
    setIsOpen(false);
  };

  const handleTownFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTownFilter(e.target.value);
    setSearchTerm("");
    onSelectStreet(null);
    setFilteredStreets([]);
  };

  return (
    <div className="w-full max-w-2xl relative z-9999" ref={dropdownRef}>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search for a street..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-8 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        <div className="relative">
          <select
            value={townFilter}
            onChange={handleTownFilterChange}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
          >
            {towns.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>
      {isOpen && filteredStreets.length > 0 && (
        <ul className="absolute z-9999 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredStreets.map((street) => (
            <li
              key={street.id}
              onClick={() => handleSelectStreet(street.id)}
              className="flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              <p>
                {street.streetName} {" -"}
              </p>
              <p className="text-gray-500">{street.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreetSearch;
