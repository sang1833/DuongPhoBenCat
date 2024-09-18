using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace be.Interfaces
{
    public interface IImageUploadService
    {
        Task<ImageUploadResult?> UploadImageAsync(IFormFile? file);
        Task<DeletionResult> DeleteImageAsync(string publicId);
    }
}