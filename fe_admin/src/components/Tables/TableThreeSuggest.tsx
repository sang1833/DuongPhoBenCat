import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
// import { ContainedNormalButton } from "@components";
import { ISuggestion, ISuggestionList } from "@types";
import { getAllSuggestions } from "@api";
import SearchBar from "./SearchBar";
import UpDownSymbol from "./UpDownSymbol";
import Pagination from "./Pagination";

const TableThreeSuggest = () => {
  const navigate = useNavigate();
  const [suggestionList, setSuggestionList] = useState<ISuggestion[]>();
  const [search, setSearch] = useState<string>("");
  const [isDesc, setIsDesc] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"createdDate" | "updatedDate">(
    "createdDate"
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchSuggestionList() {
      try {
        const response = await getAllSuggestions(
          search,
          sortBy,
          isDesc,
          currentPage,
          itemsPerPage
        );
        setSuggestionList(
          (response.data as unknown as ISuggestionList)?.suggestions
        );
        setTotalPages(
          (response.data as unknown as ISuggestionList)?.totalPages || 0
        );
      } catch (error) {
        console.error("Error fetching suggestion list:", error);
      }
    }

    const debounceFetch = setTimeout(fetchSuggestionList, 300);
    return () => clearTimeout(debounceFetch);
  }, [search, sortBy, isDesc, currentPage, itemsPerPage]);

  const handleSort = (sortField: "createdDate" | "updatedDate") => {
    if (sortBy === sortField) {
      setIsDesc(!isDesc);
    } else {
      setSortBy(sortField);
      setIsDesc(true);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <SearchBar setSearch={setSearch} />
          </div>
          {/* <ContainedNormalButton
            color="primary"
            className=" max-h-12"
            onClick={() => navigate("/map/suggestion-create")}
          >
            {"Thêm gợi ý"}
          </ContainedNormalButton> */}
        </div>
        <table className="w-full table-auto">
          {!suggestionList && (
            <thead className="flex justify-center items-center h-20">
              <tr>
                <th col-span="100%">
                  <div className="text-black dark:text-white">
                    Đang tải dữ liệu...
                  </div>
                </th>
              </tr>
            </thead>
          )}
          {suggestionList?.length === 0 ? (
            <thead className="flex justify-center items-center h-20">
              <tr>
                <th col-span="100%">
                  <div className="text-black dark:text-white">
                    Không có dữ liệu
                  </div>
                </th>
              </tr>
            </thead>
          ) : (
            <>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    STT
                  </th>
                  <th className="min-w-[120px] truncate py-4 px-4 font-medium text-black dark:text-white">
                    Tiêu đề
                  </th>
                  <th className="max-w-[300px] py-4 px-4 truncate font-medium text-black dark:text-white">
                    Nội dung
                  </th>
                  <th
                    onClick={() => handleSort("createdDate")}
                    className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white hover:bg-bodydark1 dark:hover:bg-black cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <p>Ngày tạo</p>
                      {sortBy === "createdDate" && (
                        <UpDownSymbol isDesc={isDesc} />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {suggestionList?.map((suggestion, key) => (
                  <tr
                    key={key}
                    onClick={() => navigate(`/suggest/detail/${suggestion.id}`)}
                    className="hover:bg-gray dark:hover:bg-black"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="max-w-[220px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white truncate">
                        {suggestion.title}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {suggestion.content}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {suggestion.createdDate &&
                          format(
                            parseISO(suggestion.createdDate),
                            "dd-MM-yyyy"
                          )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TableThreeSuggest;
