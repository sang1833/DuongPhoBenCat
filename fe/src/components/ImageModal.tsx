import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-9999">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <img src={imageUrl} alt="Full view" className="max-w-full max-h-[90vh] object-contain" />
      </div>
    </div>
  );
};

export default ImageModal;