using be.Helpers;
using be.Models;

namespace be.Interfaces
{
    public interface IStreetRepository
    {
        Task<(List<Street> pagedStreets, int totalPages)> GetAllAsync(StreetQueryObject queryObject);
        Task<(List<Street> pagedStreets, int totalPages)> SearchAdminAsync(StreetQueryObject queryObject);
        Task<List<Street>> SearchAllAsync(string searchParam, string? address);
        Task<List<Street>> GetStreetListByTownAsync(string? town);
        Task<Street?> GetByIdAsync(int id);
        Task<Street?> GetByIdUserAsync(int id);
        Task<Street> CreateAsync(Street? street);
        Task<Street?> UpdateAsync(Street? street, int id);
        Task<Street?> DeleteAsync(int id);
        Task<bool> IsStreetExistsAsync(int id);
    }
}