using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Helpers;
using be.Models;

namespace be.Interfaces
{
    public interface IStreetRepository
    {
        Task<List<Street>> GetAllAsync(StreetQueryObject queryObject);
        Task<List<Street>> SearchAdminAsync(StreetQueryObject queryObject);
        Task<List<Street>> SearchAllAsync(string searchParam);
        Task<Street?> GetByIdAsync(int id);
        Task<Street> CreateAsync(Street? street);
        Task<Street?> UpdateAsync(Street? street, int id);
        Task<Street?> DeleteAsync(int id);
        Task<bool> IsStreetExistsAsync(int id);
    }
}