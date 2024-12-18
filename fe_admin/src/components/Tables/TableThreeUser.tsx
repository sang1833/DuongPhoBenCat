import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";
import { FileX2, SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import { ContainedNormalButton, OutlinedNormalButton } from "@components";
import { IUser, IUserList } from "@types";
import { adminDeleteUser, getAllUser } from "@api";
import { StreetListContext } from "@contexts";
import { closeModal, openModal } from "../Features/ModalSlice";
import SearchBar from "./SearchBar";
import UpDownSymbol from "./UpDownSymbol";
import Pagination from "./Pagination";

const TableThree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filter } = useContext(StreetListContext);
  const [userList, setUserList] = useState<IUser[]>();
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
        const response = await getAllUser(
          search,
          "",
          sortBy,
          isDesc,
          currentPage,
          itemsPerPage
        );
        setUserList((response.data as unknown as IUserList)?.users);
        setTotalPages((response.data as unknown as IUserList)?.totalPages || 0);
      } catch (error) {
        console.error("Error fetching user list:", error);
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

  const handleDeleteUser = async (id: string) => {
    try {
      const respone = await adminDeleteUser(id);
      if (respone.status === 200 || respone.status === 204) {
        setUserList((prev) => prev?.filter((user) => user.id !== id));
        toast.success("Xoá người dùng thành công");
      }
    } catch (error) {
      console.error("Error deleting streetType:", error);
      toast.error("Xoá người dùng thất bại");
    }
  };

  const handleOpenModal = (deleteId: string) => {
    dispatch(
      openModal({
        title: "Xoá người dùng",
        content: (
          <div>
            <h3>Bạn có chắc muốn xoá người dùng này?</h3>
            <div className="flex justify-center items-center gap-3 mt-5">
              <ContainedNormalButton
                color="primary"
                onClick={() => {
                  handleDeleteUser(deleteId);
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
            onClick={() => navigate("/user/create")}
          >
            {"Thêm nhân viên"}
          </ContainedNormalButton>
        </div>
        <table className="w-full table-auto">
          {!userList && (
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
          {userList?.length === 0 ? (
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
                    Tên nhân viên
                  </th>
                  <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Loại người dùng
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
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Lần đăng nhập cuối
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, key) => (
                  <tr
                    key={key}
                    onClick={() => navigate(`/user/detail/${user.id}`)}
                    className="hover:bg-gray dark:hover:bg-black"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="max-w-[220px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white truncate">
                        {user.userName}
                      </p>
                    </td>
                    <td className="max-w-[220px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white truncate">
                        {user.email}
                      </p>
                    </td>
                    <td className="max-w-[220px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white truncate">
                        {user.roles[0]}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {user.createdDate &&
                          format(parseISO(user.createdDate), "dd-MM-yyyy")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {user.updatedDate &&
                          format(parseISO(user.updatedDate), "dd-MM-yyyy")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {user.lastActive &&
                          format(parseISO(user.lastActive), "dd-MM-yyyy")}
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
                            handleOpenModal(user.id);
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
