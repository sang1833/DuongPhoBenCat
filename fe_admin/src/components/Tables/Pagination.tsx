import { useTranslation } from "react-i18next";
import { MoveLeft, MoveRight } from "lucide-react";

const Pagination: React.FC<{
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage
}) => {
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 mx-1 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className="px-4 py-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Go to previous page"
          disabled={currentPage === 1}
        >
          <MoveLeft className="inline-block mr-1" />
          {t("previous")}
        </button>
        <div className="flex space-x-1">{renderPageNumbers()}</div>
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          className="px-4 py-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Go to next page"
          disabled={currentPage === totalPages}
        >
          {t("next")}
          <MoveRight className="inline-block ml-1" />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="itemsPerPage" className="text-gray-700">
          {t("itemsPerPage")}:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="rounded-md shadow-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <p className="text-gray-600">
        {t("showingPage")} {currentPage} {t("of")} {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
