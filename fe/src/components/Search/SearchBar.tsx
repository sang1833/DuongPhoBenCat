import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { StreetApi } from "@api";
import { RouteResponse } from "@types";
import { useOnClickOutside } from "@hooks";
import { addFirstRoute, clearRoutes } from "@components";

const SearchBar: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RouteResponse[]>();
  const [showDropdown, setShowDropdown] = useState(false);

  useOnClickOutside(searchRef, () => setShowDropdown(false));

  const fetchResults = useCallback(async () => {
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
      setResults(response.data as unknown as RouteResponse[]);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      const debounceFetch = setTimeout(fetchResults, 300);
      return () => clearTimeout(debounceFetch);
    } else if (query.length === 0) {
      setShowDropdown(false);
      dispatch(clearRoutes());
    }
  }, [fetchResults, query, dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (query.length > 0) {
      fetchResults();
    }
  };

  return (
    <search className="absolute z-9999 top-6 md:left-18 mr-[2vw] ml-[2vw] w-[calc(100%-4vw)] md:w-100 md:mr-0 md:ml-0">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Tìm kiếm..."
          className={`z-9999 py-2 px-6 w-full rounded-2xl border-neutral-300 shadow-3 hover:border-white ${
            showDropdown && "rounded-es-none rounded-ee-none"
          } focus:outline-none focus:border-slate-600`}
        />
        <span className="absolute w-6 h-6 p-1 right-4 top-1 text-body rounded text-2xl">
          <Search />
        </span>
      </form>
      <div
        ref={searchRef}
        className="search-drop absolute bg-white border-slate-300 rounded-es-2xl rounded-ee-2xl w-full max-h-60 overflow-y-auto shadow-lg"
      >
        {showDropdown && results && results?.length > 0 && (
          <ul>
            <li>
              <hr className="w-full text-slate-300" />
            </li>
            {results?.map((result, index) => (
              <li
                key={index}
                className="py-2 px-6 text-black cursor-pointer hover:bg-gray-200 hover:bg-slate-100"
                onClick={() => {
                  setShowDropdown(false);
                  dispatch(addFirstRoute(result));
                  setQuery(result.streetName || "");
                }}
              >
                {result.streetName}
              </li>
            ))}
          </ul>
        )}
        {showDropdown && results && results?.length === 0 && (
          <ul>
            <li>
              <hr className="w-full text-slate-300" />
            </li>
            <li className="py-2 px-6 text-black">Không tìm thấy kết quả...</li>
          </ul>
        )}
      </div>
    </search>
  );
};

export default SearchBar;
