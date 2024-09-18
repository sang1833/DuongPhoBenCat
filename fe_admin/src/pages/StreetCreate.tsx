/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, Upload } from "lucide-react";
import { Map, StreetImage } from "@components";

interface Image {
  file: File;
  preview: string;
  caption: string;
}

interface ErrorMessages {
  streetName?: string;
  streetAddress?: string;
}

const PostStreetPage: React.FC = () => {
  const [streetName, setStreetName] = useState<string>("");
  const [streetType, setStreetType] = useState<string>("residential");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [streetDescription, setStreetDescription] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [streetImages, setStreetImages] = useState<Image[]>([]);
  const [errors, setErrors] = useState<ErrorMessages>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: ""
    }));
    setStreetImages([...streetImages, ...newImages]);
  };

  const handleImageCaptionChange = (index: number, caption: string) => {
    const updatedImages = [...streetImages];
    updatedImages[index].caption = caption;
    setStreetImages(updatedImages);
  };

  const validateForm = () => {
    const newErrors: ErrorMessages = {};
    if (!streetName.trim()) newErrors.streetName = "Street name is required";
    if (!streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted", {
        streetName,
        streetType,
        streetAddress,
        streetDescription,
        markers,
        streetImages
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post Street Information</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="streetName"
            className="block text-sm font-medium text-gray-700"
          >
            Street Name
          </label>
          <input
            type="text"
            id="streetName"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50 ${
              errors.streetName ? "border-red-500" : ""
            }`}
            placeholder="Enter street name"
          />
          {errors.streetName && (
            <p className="mt-2 text-sm text-red-600">{errors.streetName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="streetType"
            className="block text-sm font-medium text-gray-700"
          >
            Street Type
          </label>
          <select
            id="streetType"
            value={streetType}
            onChange={(e) => setStreetType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address
          </label>
          <input
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50 ${
              errors.streetAddress ? "border-red-500" : ""
            }`}
            placeholder="Enter street address"
          />
          {errors.streetAddress && (
            <p className="mt-2 text-sm text-red-600">{errors.streetAddress}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="streetDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Street Description
          </label>
          <textarea
            id="streetDescription"
            value={streetDescription}
            onChange={(e) => setStreetDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme-color-primary focus:ring focus:ring-theme-color-primary focus:ring-opacity-50"
            placeholder="Describe the street"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Route
          </label>
          <Map />
          <p className="mt-2 text-sm text-gray-500">
            Click on the map to add markers and create a route.
          </p>
        </div>

        <StreetImage
          streetImages={streetImages}
          setStreetImages={setStreetImages}
          handleImageUpload={handleImageUpload}
          handleImageCaptionChange={handleImageCaptionChange}
        />

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-theme-color-primary hover:bg-theme-color-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary"
          >
            Submit Street Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostStreetPage;
