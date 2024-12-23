import { AlertTriangle } from "lucide-react";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/popupSlice";

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className="bg-gray-200 text-gray-500 flex items-center justify-between">
      <ul className="px-2 flex gap-4 flex-row justify-start">
        {/* <li>
          <Link to="/on-develop" className="flex items-center gap-1">
            <HelpCircle size={20} />
            Trợ giúp
          </Link>
        </li> */}
        <li>
          <button
            className="flex items-center gap-1"
            onClick={() =>
              dispatch(
                openPopup({
                  header: "Góp ý",
                  content: "report"
                })
              )
            }
          >
            <AlertTriangle size={20} /> Góp ý
          </button>
        </li>
      </ul>
      <span className="text-sm flex justify-end px-2">
        {"© Bản đồ Bến Cát - 2024"}
      </span>
    </footer>
  );
};

export default Footer;
