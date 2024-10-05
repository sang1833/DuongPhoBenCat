import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ISearchBarProps } from "@types";

const SearchBar: React.FC<ISearchBarProps> = ({ setSearch }) => {
  const { t } = useTranslation();
  return (
    <search className="relative block py-4 max-w-75">
      <form>
        <div className="relative border p-2 border-body hover:border-primary rounded-md shadow-3">
          <button className="absolute left-2 top-1/2 -translate-y-1/2">
            <Search />
          </button>

          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-75"
          />
        </div>
      </form>
    </search>
  );
};

export default SearchBar;
