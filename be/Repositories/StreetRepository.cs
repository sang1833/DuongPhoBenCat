using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class StreetRepository : IStreetRepository
    {
        private readonly AppDbContext _context;

        public StreetRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<Street> CreateAsync(Street street)
        {
            await _context.Streets.AddAsync(street);
            await _context.SaveChangesAsync();
            return street;
        }

        public async Task<List<Street>> GetAllAsync(StreetQueryObject queryObject)
        {
            IQueryable<Street> streets = _context.Streets.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.StreetName))
            {
                string lowerCaseStreetName = queryObject.StreetName.ToLower();
                streets = streets.Where(s => s.StreetName.ToLower().Contains(lowerCaseStreetName));
            }

            if (!string.IsNullOrWhiteSpace(queryObject.StreetType))
            {
                streets = streets.Where(s => s.StreetType == queryObject.StreetType);
            }

            if (!string.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                if(queryObject.SortBy.Equals("StreetName", StringComparison.OrdinalIgnoreCase)){
                    streets = queryObject.IsDecsending ? streets.OrderByDescending(x => x.StreetName) : streets.OrderBy(x => x.StreetName);
                }
            }

            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            return await streets.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();
        }

        public async Task<Street?> GetByIdAsync(int id)
        {
            return await _context.Streets.FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}