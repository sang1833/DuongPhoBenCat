import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, language, onLanguageChange }) => {
  const [tempLanguage, setTempLanguage] = useState(language);

  if (!isOpen) return null;

  const handleOk = () => {
    onLanguageChange(tempLanguage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            id="language"
            value={tempLanguage}
            onChange={(e) => setTempLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleOk}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;