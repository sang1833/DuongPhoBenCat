import React, { useState, useMemo } from "react";
// import { PlusIcon } from "lucide-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { IStreetHistory } from "@types";

const StreetHistory: React.FC<{
  histories: IStreetHistory[];
  setHistories: React.Dispatch<React.SetStateAction<IStreetHistory[]>>;
}> = ({ histories, setHistories }) => {
  //   const [histories, setHistories] = useState<IStreetHistory[]>([]);
  const [period, setPeriod] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"]
      ]
    }),
    []
  );

  const { quill, quillRef } = useQuill({ modules });

  const addHistory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (quill && period && quill.getText().trim()) {
      const description = quill.root.innerHTML;
      if (editingId) {
        setHistories(
          histories.map((h) =>
            h.id === editingId ? { ...h, period, description } : h
          )
        );
        setEditingId(null);
      } else {
        setHistories([
          ...histories,
          { id: Date.now().toString(), period, description }
        ]);
      }
      setPeriod("");
      quill.setText("");
    }
  };

  const deleteHistory = (id: string) => {
    setHistories(histories.filter((h) => h.id !== id));
  };

  const editHistory = (entry: IStreetHistory) => {
    setPeriod(entry.period);
    if (quill) {
      quill.root.innerHTML = entry.description;
    }
    setEditingId(entry.id);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="Period (e.g., 1960 or 1991 - 1995)"
            className="border p-2 rounded-md flex-grow bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={addHistory}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <span className="text-2xl font-bold leading-none">
              {editingId ? "✓" : "+"}
            </span>
          </button>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
          <div ref={quillRef} className="h-64" />
        </div>
      </div>
      <ul className="space-y-6">
        {histories.map((entry) => (
          <li
            key={entry.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-4 border-b border-slate-300 dark:border-gray-100 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {entry.period}
                </h3>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => editHistory(entry)}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-300 focus:outline-none focus:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHistory(entry.id)}
                    className="text-red-500 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div
                dangerouslySetInnerHTML={{ __html: entry.description }}
                className="prose dark:prose-invert max-w-none"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreetHistory;
