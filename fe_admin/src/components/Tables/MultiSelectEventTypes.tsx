import { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EventType {
  id: number;
  name: string;
  color: string;
}

const eventTypes = [
  { id: 1, name: "Đường lớn", color: "bg-blue-500" },
  { id: 2, name: "Hẻm", color: "bg-pink-500" },
  { id: 3, name: "Đường nhỏ", color: "bg-green-500" }
];

const MultiSelectEventTypes = () => {
  const { t } = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");

  const handleTypeToggle = (eventType: EventType) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(eventType)
        ? prevSelected.filter((type) => type !== eventType)
        : [...prevSelected, eventType]
    );
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
  };

  // const filteredEventTypes = eventTypes.filter((type) =>
  //   type.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-md mb-4">{t("filterTitle")}</h2>

      {/* <div className="relative mb-4">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search event types"
        />
        <Search className="absolute left-2 top-2 text-gray-400" />
      </div> */}

      <div className="space-y-2 mb-4">
        {eventTypes.map((type) => (
          <label
            key={type.id}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeToggle(type)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              aria-label={`Select ${type.name}`}
            />
            <span className={`ml-2 ${type.color} w-4 h-4 rounded-full`}></span>
            <span className="ml-2">{type.name}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          aria-label="Clear all selections"
        >
          {t("clearAll")}
        </button>
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <span
              key={type.id}
              className={`${type.color} text-white px-2 py-1 rounded-full text-sm flex items-center`}
            >
              {type.name}
              <button
                onClick={() => handleTypeToggle(type)}
                className="ml-1 focus:outline-none"
                aria-label={`Remove ${type.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectEventTypes;
