using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Helpers;
using be.Models;

namespace be.Interfaces
{
    public interface ISuggestRepository
    {
        Task<Suggestion> CreateAsync(Suggestion suggestion);
        Task<Suggestion?> GetByIdAsync(int id);
        Task<(List<Suggestion>, int)> GetAllAsync(SuggestQueryObject queryObject);
    }
}