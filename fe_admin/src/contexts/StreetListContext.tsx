import { IStreetListContext } from "@types/index";
import { createContext, ReactNode, useState } from "react";

export const StreetListContext = createContext<IStreetListContext>({
  filter: "",
  setFilter: () => {},
  sortBy: "",
  setSortBy: () => {},
  isDesc: false,
  setIsDesc: () => {},
  pageNumber: 1,
  setPageNumber: () => {},
  pageSize: 10,
  setPageSize: () => {}
});

const StreetListProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [isDesc, setIsDesc] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  return (
    <StreetListContext.Provider
      value={{
        filter,
        setFilter,
        sortBy,
        setSortBy,
        isDesc,
        setIsDesc,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize
      }}
    >
      {children}
    </StreetListContext.Provider>
  );
};

export default StreetListProvider;
