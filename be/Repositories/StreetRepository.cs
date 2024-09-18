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
        
        public async Task<Street> CreateAsync(Street? street)
        {
            if (street == null)
            {
                throw new Exception("Street is null");
            }
            
            await _context.Streets.AddAsync(street);
            await _context.SaveChangesAsync();
            return street;
        }

        public async Task<Street?> DeleteAsync(int id)
        {
            Street? deleteStreet = await _context.Streets.FirstOrDefaultAsync(s => s.Id == id);
            if (deleteStreet == null)
            {
                return null;
            }

            _context.Streets.Remove(deleteStreet);
            await _context.SaveChangesAsync();

            return deleteStreet;
        }

        public async Task<List<Street>> GetAllAsync(StreetQueryObject queryObject)
        {
            IQueryable<Street> streets = _context.Streets.Include(c => c.Histories).Include(c => c.Images).AsQueryable();

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
                } else if(queryObject.SortBy.Equals("UpdatedDate", StringComparison.OrdinalIgnoreCase)){
                    streets = queryObject.IsDecsending ? streets.OrderByDescending(x => x.UpdatedDate) : streets.OrderBy(x => x.UpdatedDate);
                } else if(queryObject.SortBy.Equals("CreatedDate", StringComparison.OrdinalIgnoreCase)){
                    streets = queryObject.IsDecsending ? streets.OrderByDescending(x => x.CreatedDate) : streets.OrderBy(x => x.CreatedDate);
                } else if(queryObject.SortBy.Equals("StreetType", StringComparison.OrdinalIgnoreCase)){
                    streets = queryObject.IsDecsending ? streets.OrderByDescending(x => x.StreetType) : streets.OrderBy(x => x.StreetType);
                } else if(queryObject.SortBy.Equals("Address", StringComparison.OrdinalIgnoreCase)){
                    streets = queryObject.IsDecsending ? streets.OrderByDescending(x => x.Address) : streets.OrderBy(x => x.Address);
                } 
            }

            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            return await streets.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();
        }

        public async Task<Street?> GetByIdAsync(int id)
        {
            return await _context.Streets
                .Include(c => c.Histories)
                .Include(c => c.Images)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<bool> IsStreetExistsAsync(int id)
        {
            return _context.Streets.AnyAsync(s => s.Id == id);
        }

        public async Task<List<Street>> SearchAllAsync(string searchParam)
        {
            IQueryable<Street> streets = _context.Streets.AsQueryable();
                
            string lowerCaseStreetName = searchParam.ToLower();
            streets = streets.Where(s => s.StreetName.ToLower().Contains(lowerCaseStreetName));
            
            return await streets.Skip(0).Take(5).ToListAsync();
        }

        public async Task<Street?> UpdateAsync(Street? streetModel, int id)
        {
            Street? existingStreet = _context.Streets.FirstOrDefault(s => s.Id == id);
            if (existingStreet == null || streetModel == null)
            {
                return null;
            }

            existingStreet.StreetName = streetModel.StreetName;
            existingStreet.StreetType = streetModel.StreetType;
            existingStreet.Address = streetModel.Address;
            existingStreet.Description = streetModel.Description;
            existingStreet.ImageUrl = streetModel.ImageUrl;
            existingStreet.UpdatedDate = DateTime.Now;
            existingStreet.Route = streetModel.Route;
            existingStreet.WayPoints = streetModel.WayPoints;

            await _context.SaveChangesAsync();

            return existingStreet;
        }
    }
}