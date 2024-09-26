using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Models;

namespace be.Interfaces
{
    public interface IStreetImageRepository
    {
        Task<List<StreetImage>> GetAllAsync();
        Task<StreetImage?> GetByIdAsync(int id);
        Task<List<StreetImage>> GetImagesByStreetIdAsync(int streetId);
        Task<StreetImage> CreateAsync(StreetImage streetImage);
        Task<StreetImage?> UpdateAsync(StreetImage streetImage, int id);
        Task<StreetImage?> UpdatePublicIdAsync(StreetImage streetImage);
        Task<StreetImage?> DeleteAsync(int id);
        Task<StreetImage?> DeletePublicIdAsync(string publicId);
        Task<bool> IsStreetImageExistsAsync(int id);
    }
}