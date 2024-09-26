import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@types";
import { closeModal } from "../Features/ModalSlice";

const DefaultModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, content } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isOpen) return null;

  return (
    <div className="absolute z-99999 inset-0 bg-gray bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center p-4 border-b-2 border-slate-200">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-600 text-3xl hover:text-gray-900 font-semibold"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

export default DefaultModal;
