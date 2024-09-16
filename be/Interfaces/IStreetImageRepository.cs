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
        Task<StreetImage> CreateAsync(StreetImage streetImage);
        Task<StreetImage?> UpdateAsync(StreetImage streetImage, int id);
        Task<StreetImage?> DeleteAsync(int id);
    }
}