import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";
import { FileX2, SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import { ContainedNormalButton, OutlinedNormalButton } from "@components";
import { IStreetType, IStreetTypeList } from "@types";
import { adminDeleteStreetType, adminGetStreetTypes } from "@api";
import { StreetListContext } from "@contexts";
import { closeModal, openModal } from "../Features/ModalSlice";
import SearchBar from "./SearchBar";
import UpDownSymbol from "./UpDownSymbol";
import Pagination from "./Pagination";

const TableThree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filter } = useContext(StreetListContext);
  const [streetTypeList, setStreetTypeList] = useState<IStreetType[]>();
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
        const response = await adminGetStreetTypes(
          search,
          sortBy,
          isDesc,
          currentPage,
          itemsPerPage
        );
        setStreetTypeList(
          (response.data as unknown as IStreetTypeList)?.streetTypes
        );
        setTotalPages(
          (response.data as unknown as IStreetTypeList)?.totalPages || 0
        );
      } catch (error) {
        console.error("Error fetching streetType list:", error);
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

  const handleDeleteSType = async (id: number) => {
    try {
      const respone = await adminDeleteStreetType(id);
      if (respone.status === 200 || respone.status === 204) {
        setStreetTypeList((prev) =>
          prev?.filter((streetType) => streetType.id !== id)
        );
        toast.success("Xoá loại đường thành công");
      }
    } catch (error) {
      console.error("Error deleting streetType:", error);
      toast.error("Xoá loại đường thất bại");
    }
  };

  const handleOpenModal = (deleteId: number) => {
    dispatch(
      openModal({
        title: "Xoá loại đường",
        content: (
          <div>
            <h3>Bạn có chắc muốn xoá loại đường này?</h3>
            <p className="font-bold text-red-700">
              Lưu ý: xoá loại đường sẽ xoá luôn các tuyến đường thuộc loại đó
            </p>
            <div className="flex justify-center items-center gap-3 mt-5">
              <ContainedNormalButton
                color="primary"
                onClick={() => {
                  handleDeleteSType(deleteId);
                  dispatch(closeModal());
                }}
              >
                Xoá
              </ContainedNormalButton>
              <OutlinedNormalButton
                color="red-700"
                onClick={() => dispatch(closeModal())}
              >
                Huỷ
              </OutlinedNormalButton>
            </div>
          </div>
        )
      })
    );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <SearchBar setSearch={setSearch} />
          </div>
          <ContainedNormalButton
            color="primary"
            className=" max-h-12"
            onClick={() => navigate("/map/street-type-create")}
          >
            {"Thêm tuyến đường"}
          </ContainedNormalButton>
        </div>
        <table className="w-full table-auto">
          {!streetTypeList && (
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
          {streetTypeList?.length === 0 ? (
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
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
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
                {streetTypeList?.map((packageItem, key) => (
                  <tr
                    key={key}
                    onClick={() =>
                      navigate(`/map/street-type-detail/${packageItem.id}`)
                    }
                    className="hover:bg-gray dark:hover:bg-black"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="max-w-[220px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white truncate">
                        {packageItem.streetTypeName}
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
                        <button
                          className="z-9999 text-red-700 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(packageItem.id);
                          }}
                        >
                          <FileX2 />
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
