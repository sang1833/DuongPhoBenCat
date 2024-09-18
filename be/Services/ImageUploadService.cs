using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace be.Services
{
    public class ImageUploadService : IImageUploadService
    {
        private readonly Cloudinary _cloudinary;

        public ImageUploadService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            try {
                var deletionParams = new DeletionParams(publicId);
                return await _cloudinary.DestroyAsync(deletionParams);
            } catch (Exception ex) {
                throw new Exception("Error deleting image", ex);
            }
        }

        public async Task<ImageUploadResult?> UploadImageAsync(IFormFile? file)
        {
            if (file == null)
            {
                return null;
            }

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream())
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult;
        }
    }
}