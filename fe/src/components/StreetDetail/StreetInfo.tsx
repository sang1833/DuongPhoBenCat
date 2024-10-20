import { useEffect, useState } from "react";
import { IImage, StreetInfo } from "../../types";
import ImageModal from "../ImageModal";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { getStreetDetail } from "../../apis/function";

const StreetInfoCard = () => {
  const { streetId } = useParams();
  const [street, setStreet] = useState<StreetInfo | null>(null);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);

  useEffect(() => {
    const fetchStreetInfo = async () => {
      const response = await getStreetDetail(Number(streetId));

      setStreet(response as StreetInfo);
    };
    fetchStreetInfo();
  }, [streetId]);

  return (
    <div className="w-full max-w-30 sm:w-1/3 h-1/2 sm:h-full max-h-30 overflow-x-auto overflow-y-auto">
      <div className="z-9999 bg-white p-6 h-full overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{street?.streetName}</h2>
        <p className="text-gray-600 mb-4">{street?.address}</p>
        <p className="mb-4">{street?.description}</p>

        <h3 className="text-xl font-semibold mb-2">Hình ảnh</h3>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {street?.images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`${street.streetName} - Image ${index + 1}`}
              className="w-32 h-32 object-cover rounded cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Lịch sử</h3>
        <ul className="list-none">
          {street?.histories.map((item, index) => (
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
            imageUrl={selectedImage.imageUrl}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StreetInfoCard;
