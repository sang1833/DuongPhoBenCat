import { useCallback, useState } from "react";
import axios from "axios";
import { ImageIcon, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { IStreetImage } from "@types";

const UploadImageUrl = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_NAME
}/image/upload`;

const StreetImage: React.FC<{
  streetImages: IStreetImage[];
  setStreetImages: React.Dispatch<React.SetStateAction<IStreetImage[]>>;
}> = ({ streetImages, setStreetImages }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageCaptionChange = (index: number, description: string) => {
    const updatedImages = [...streetImages];
    updatedImages[index].description = description;
    setStreetImages(updatedImages);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (streetImages.length >= 5) {
        alert("không thể upload quá 5 hình ảnh");
        return;
      } else if (!acceptedFiles[0].type.includes("image")) {
        alert("Chỉ chấp nhận file ảnh");
        return;
      }

      const reader = new FileReader();

      const handlePostImage = async (files: File) => {
        setLoading(true);

        if (files) {
          const formData = new FormData();
          formData.append("file", files);
          formData.append("upload_preset", "dpbc_image");

          const respone = await axios.post(UploadImageUrl, formData);
          const { data } = respone;
          const { secure_url, public_id } = data;
          const newImage = {
            imageUrl: secure_url,
            publicId: public_id,
            description: ""
          };
          setStreetImages([...streetImages, newImage]);
        }

        setLoading(false);
      };

      acceptedFiles.forEach((file) => {
        reader.onabort = () => setLoading(true);
        reader.onerror = () =>
          console.log("street image in create street page error");
        reader.onload = () => {
          handlePostImage(file);
        };
        setLoading(false);
        reader.readAsArrayBuffer(file);
      });
    },
    [setStreetImages, streetImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"]
    }
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Hình ảnh
      </label>
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full"
      >
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
            isDragActive
              ? "border-green-700 bg-zinc-300 dark:bg-gray-3"
              : "border-gray-300"
          } border-dashed rounded-lg cursor-pointer hover:bg-gray-100`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            {loading ? (
              <p className="mb-2 text-sm text-gray-500">Đang đăng ảnh...</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Nhấn hoặc kéo thả</span> để
                  đăng ảnh
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF lên tới 50MB
                </p>
              </>
            )}
          </div>

          <input {...getInputProps()} className="hidden" />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {streetImages?.map((image, index) => (
          <div key={index}>
            {loading && (
              <div>
                <p>loading...</p>
              </div>
            )}

            <div className="relative group">
              <img
                src={image.imageUrl}
                alt={`Street view ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                <ImageIcon className="text-white text-3xl" />
              </div>
              <input
                type="text"
                value={image.description}
                onChange={(e) =>
                  handleImageCaptionChange(index, e.target.value)
                }
                className="mt-2 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50"
                placeholder="Thêm mô tả"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreetImage;
