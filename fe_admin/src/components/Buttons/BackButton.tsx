import { CircleChevronLeft } from "lucide-react";

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <aside className="pb-4">
      <button
        type="button"
        onClick={onClick}
        className="bg-transparent hover:bg-slate-300 text-black font-bold rounded-full dark:text-whiten"
      >
        <CircleChevronLeft size={32} />
      </button>
    </aside>
  );
};

export default BackButton;
