import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SearchIcon } from "@components";
import { StreetApi } from "@api";
import { RouteResponse } from "@types";
import { addRoute } from "../Features/StreetSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RouteResponse[]>();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const fetchResults = async () => {
        try {
          const api = new StreetApi();
          const response = await api.apiStreetGet(
            query,
            undefined,
            undefined,
            undefined,
            1,
            5
          );
          setResults(response as unknown as RouteResponse[]);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      const debounceFetch = setTimeout(fetchResults, 300);

      return () => clearTimeout(debounceFetch);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    if (results && results.length === 1) dispatch(addRoute(results[0]));
  }, [results]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setShowDropdown(false);
  };

  return (
    <search className="absolute z-9999 top-6 left-6">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm..."
          className="border py-2 px-4 rounded-2xl border-neutral-300 shadow-3 hover:border-neutral-500"
        />
        <span className="absolute w-6 h-6 p-1 right-3 top-2 text-body rounded text-2xl">
          <SearchIcon />
        </span>
      </form>
      {showDropdown && results && results?.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto rounded shadow-lg">
          {results?.map((result, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setQuery(result.streetName || "");
                setShowDropdown(false);
              }}
            >
              {result.streetName}
            </li>
          ))}
        </ul>
      )}
    </search>
  );
};

export default SearchBar;
