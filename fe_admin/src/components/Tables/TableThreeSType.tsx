import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { SquarePen } from "lucide-react";
import { ContainedNormalButton } from "@components";
import { IStreetSearch, IStreetSearchList } from "@types";
import { StreetApi } from "@api";
import { StreetListContext } from "@contexts";
import SearchBar from "./SearchBar";
// import DropDownFilter from "./DropdownFilter";
import UpDownSymbol from "./UpDownSymbol";
import Pagination from "./Pagination";

const TableThree = () => {
  const navigate = useNavigate();
  const { filter } = useContext(StreetListContext);
  const [streetList, setStreetList] = useState<IStreetSearch[]>();
  const [search, setSearch] = useState<string>("");
  const [isDesc, setIsDesc] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"createdDate" | "updatedDate">(
    "createdDate"
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchStreetList() {
      try {
        const streetApi = new StreetApi();
        const response = await streetApi.apiStreetAdminSearchGet(
          search,
          filter,
          sortBy,
          isDesc,
          currentPage,
          itemsPerPage
        );
        setStreetList((response.data as unknown as IStreetSearchList)?.streets);
        setTotalPages(
          (response.data as unknown as IStreetSearchList)?.totalPages
        );
      } catch (error) {
        console.error("Error fetching street list:", error);
      }
    }

    const debounceFetch = setTimeout(fetchStreetList, 300);
    return () => clearTimeout(debounceFetch);
  }, [search, filter, sortBy, isDesc, currentPage, itemsPerPage]);

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
            {/* <DropDownFilter /> */}
          </div>
          <ContainedNormalButton
            color="primary"
            className=" max-h-12"
            onClick={() => navigate("/street-create")}
          >
            {"Thêm đường"}
          </ContainedNormalButton>
        </div>
        <table className="w-full table-auto">
          {!streetList && (
            <thead className="flex justify-center items-center h-20">
              <p className="text-black dark:text-white">Đang tải dữ liệu...</p>
            </thead>
          )}
          {streetList?.length === 0 ? (
            <thead className="flex justify-center items-center h-20">
              <p className="text-black dark:text-white">Không có dữ liệu</p>
            </thead>
          ) : (
            <>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Tên loại đường
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
                  <th
                    onClick={() => handleSort("updatedDate")}
                    className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white hover:bg-bodydark1 dark:hover:bg-black cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <p>Ngày cập nhật</p>
                      {sortBy === "updatedDate" && (
                        <UpDownSymbol isDesc={isDesc} />
                      )}
                    </div>
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {streetList?.map((packageItem, key) => (
                  <tr
                    key={key}
                    onClick={() => navigate(`/street-detail/${packageItem.id}`)}
                    className="hover:bg-gray dark:hover:bg-black"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.streetName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.address}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          packageItem.streetType.id === 1
                            ? "bg-blue-700 text-blue-700"
                            : packageItem.streetType.id === 2
                            ? "bg-pink-700 text-pink-700"
                            : "bg-green-700 text-green-700"
                        }`}
                      >
                        {packageItem.streetType.streetTypeName}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.createdDate &&
                          format(
                            parseISO(packageItem.createdDate),
                            "dd-MM-yyyy"
                          )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.updatedDate &&
                          format(
                            parseISO(packageItem.updatedDate),
                            "dd-MM-yyyy"
                          )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <SquarePen />
                        </button>
                      </div>
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

export default TableThree;
