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

            StreetType? streetType = await _context.StreetTypes.FirstOrDefaultAsync(s => s.Id == street.StreetTypeId);

            if (streetType == null)
            {
                throw new Exception("StreetType is null");
            }

            street.StreetType = streetType;
            
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

        public async Task<(List<Street> pagedStreets, int totalPages)> GetAllAsync(StreetQueryObject queryObject)
        {
            IQueryable<Street> streets = _context.Streets.Include(c => c.StreetType).Include(c => c.Histories).Include(c => c.Images).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.StreetName))
            {
                streets = streets.Where(s => EF.Functions.ILike(s.StreetName.ToLower(), $"%{queryObject.StreetName}%"));
            }

            if (!string.IsNullOrWhiteSpace(queryObject.StreetType))
            {
                streets = streets.Where(s => s.StreetType != null && s.StreetType.StreetTypeName == queryObject.StreetType);
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

            int totalItems = await streets.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)queryObject.PageSize);
            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            List<Street> pagedStreets = await streets.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return (pagedStreets, totalPages);
        }

        public async Task<Street?> GetByIdAsync(int id)
        {
            return await _context.Streets
                .Include(c => c.StreetType)
                .Include(c => c.Histories)
                .Include(c => c.Images)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<bool> IsStreetExistsAsync(int id)
        {
            return _context.Streets.AnyAsync(s => s.Id == id);
        }

        public async Task<(List<Street> pagedStreets, int totalPages)> SearchAdminAsync(StreetQueryObject queryObject)
        {
            IQueryable<Street> streets = _context.Streets.Include(c => c.StreetType).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.StreetName))
            {
                streets = streets.Where(s => EF.Functions.ILike(s.StreetName.ToLower(), $"%{queryObject.StreetName}%"));
            }

            if (!string.IsNullOrWhiteSpace(queryObject.StreetType))
            {
                streets = streets.Where(s => s.StreetType != null && s.StreetType.StreetTypeName == queryObject.StreetType);
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

            int totalItems = await streets.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)queryObject.PageSize);
            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            List<Street> pagedStreets = await streets.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return (pagedStreets, totalPages);
        }

        public async Task<List<Street>> SearchAllAsync(string searchParam)
        {
            IQueryable<Street> streets = _context.Streets.Include(c => c.StreetType).AsQueryable();
                
            streets = streets.Where(s => EF.Functions.Like(s.StreetName.ToLower(), $"%{searchParam}%"));
            
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
            existingStreet.StreetTypeId = streetModel.StreetTypeId;
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