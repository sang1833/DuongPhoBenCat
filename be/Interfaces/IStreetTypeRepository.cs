using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Helpers;
using be.Models;

namespace be.Interfaces
{
    public interface IStreetTypeRepository
    {
        Task<(List<StreetType>, int totalPages)> GetAllAsync(STypeQueryObject queryObject);
        Task<StreetType?> GetByIdAsync(int id);
        Task<StreetType> CreateAsync(StreetType streetHistory);
        Task<StreetType?> UpdateAsync(StreetType streetHistory, int id);
        Task<StreetType?> DeleteAsync(int id);
        Task<bool> IsStreetTypeExistsAsync(int id);
    }
}