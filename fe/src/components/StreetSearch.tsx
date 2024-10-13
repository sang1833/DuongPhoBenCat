import React, { useState, useRef, useEffect } from 'react';
import { StreetInfo } from '../types';
import { Search, X, ChevronDown } from 'lucide-react';

interface StreetSearchProps {
  streets: StreetInfo[];
  onSelectStreet: (street: StreetInfo | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  townFilter: string;
  setTownFilter: (town: string) => void;
}

const StreetSearch: React.FC<StreetSearchProps> = ({
  streets,
  onSelectStreet,
  searchTerm,
  setSearchTerm,
  townFilter,
  setTownFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const towns = ["All", ...Array.from(new Set(streets.map(street => street.address.split(', ')[1])))];

  const filteredStreets = streets.filter((street) => {
    const matchesSearch = street.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTownFilter = townFilter === 'All' || street.address.includes(townFilter);
    return matchesSearch && matchesTownFilter;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelectStreet = (street: StreetInfo) => {
    onSelectStreet(street);
    setSearchTerm(street.name);
    setTownFilter(street.address.split(', ')[1]);
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSelectStreet(null);
    setIsOpen(false);
  };

  const handleTownFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTownFilter(e.target.value);
    setSearchTerm('');
    onSelectStreet(null);
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
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select
            value={townFilter}
            onChange={handleTownFilterChange}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
          >
            {towns.map((town) => (
              <option key={town} value={town}>{town}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>
      {isOpen && filteredStreets.length > 0 && (
        <ul className="absolute z-9999 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredStreets.map((street) => (
            <li
              key={street.id}
              onClick={() => handleSelectStreet(street)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              {street.name} - {street.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreetSearch;