import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closePopup } from "../redux/popupSlice";
import Report from "./Popup/Report";
import { X } from "lucide-react";

const Popup = () => {
  const dispatch = useDispatch();
  const { isOpen, header, content } = useSelector(
    (state: RootState) => state.popup
  );

  if (!isOpen) return null;

  return (
    <div className="z-9999 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="min-w-[300px] bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-bold">{header}</h2>
        </div>
        <div className="mb-4">
          {content === "report" ? <Report /> : <p>{content}</p>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
