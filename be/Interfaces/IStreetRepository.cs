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
        Task<Street?> GetByIdAsync(int id);
        Task<Street> CreateAsync(Street street);
    }
}