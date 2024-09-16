using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Models;

namespace be.Interfaces
{
    public interface IStreetHistoryRepository
    {
        Task<List<StreetHistory>> GetAllAsync();
        Task<StreetHistory?> GetByIdAsync(int id);
        Task<StreetHistory> CreateAsync(StreetHistory streetHistory);
        Task<StreetHistory?> UpdateAsync(StreetHistory streetHistory, int id);
        Task<StreetHistory?> DeleteAsync(int id);
    }
}