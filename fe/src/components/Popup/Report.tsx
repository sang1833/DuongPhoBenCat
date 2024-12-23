import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closePopup } from "../../redux/popupSlice";
import { reportStreet } from "@/apis/function";

const Report = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await reportStreet(title, content);
      if (res.status === 200) {
        setShowThankYou(true);
        setTimeout(() => dispatch(closePopup()), 1000 * 1000);
        return;
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setErrorMessage("Tiêu đề và nội dung không được cùng lúc để trống");
      return;
    }
  };

  return showThankYou ? (
    <div>
      <div className="text-center p-4">Cảm ơn bạn đã gửi ý kiến đóng góp!</div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => dispatch(closePopup())}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Thoát
        </button>
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Tiêu đề
        </label>
        <input
          type="text"
          placeholder="Nhập tiêu đề"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Nội dung
        </label>
        <textarea
          id="content"
          placeholder="Nhập nội dung (Có thể để trống)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={4}
        />
      </div>
      {showError && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => dispatch(closePopup())}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
};

export default Report;
