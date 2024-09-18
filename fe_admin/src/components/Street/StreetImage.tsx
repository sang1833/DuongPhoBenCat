import { ImageIcon, Upload } from "lucide-react";

interface Image {
  file: File;
  preview: string;
  caption: string;
}

const StreetImage: React.FC<{
  streetImages: Image[];
  setStreetImages?: React.Dispatch<React.SetStateAction<Image[]>>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageCaptionChange: (index: number, caption: string) => void;
}> = ({ streetImages, handleImageUpload, handleImageCaptionChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Street Images
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {streetImages.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.preview}
              alt={`Street view ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
              <ImageIcon className="text-white text-3xl" />
            </div>
            <input
              type="text"
              value={image.caption}
              onChange={(e) => handleImageCaptionChange(index, e.target.value)}
              className="mt-2 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50"
              placeholder="Add caption"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreetImage;
