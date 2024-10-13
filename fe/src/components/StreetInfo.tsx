import React, { useState } from 'react';
import { StreetInfo } from '../types';
import ImageModal from './ImageModal';
import parse from 'html-react-parser';

interface StreetInfoProps {
  street: StreetInfo;
}

const StreetInfoCard: React.FC<StreetInfoProps> = ({ street }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{street.name}</h2>
      <p className="text-gray-600 mb-4">{street.address}</p>
      <p className="mb-4">{street.description}</p>

      <h3 className="text-xl font-semibold mb-2">Images</h3>
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {street.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${street.name} - Image ${index + 1}`}
            className="w-32 h-32 object-cover rounded cursor-pointer"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-2">History</h3>
      <ul className="list-none">
        {street.history.map((item, index) => (
          <li key={index} className="mb-4">
            <h4 className="font-semibold text-lg">{item.period}</h4>
            <div className="prose prose-sm max-w-none">
              {parse(item.description)}
            </div>
          </li>
        ))}
      </ul>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default StreetInfoCard;