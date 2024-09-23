using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class StreetTypeRepository : IStreetTypeRepository
    {
        private readonly AppDbContext _context;
        
        public StreetTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        

        public async Task<StreetType> CreateAsync(StreetType streetHistory)
        {
            if (streetHistory == null)
            {
                throw new Exception("StreetType is null");
            }

            await _context.StreetTypes.AddAsync(streetHistory);
            await _context.SaveChangesAsync();

            return streetHistory;
        }

        public async Task<StreetType?> DeleteAsync(int id)
        {
            StreetType? streetType = _context.StreetTypes.FirstOrDefault(s => s.Id == id);
            if (streetType == null)
            {
                return null;
            }

            _context.StreetTypes.Remove(streetType);
            await _context.SaveChangesAsync();

            return streetType;
        }

        public async Task<(List<StreetType>, int totalPages)> GetAllAsync(STypeQueryObject queryObject)
        {
            IQueryable<StreetType> streetTypes = _context.StreetTypes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.StreetTypeName))
            {
                streetTypes = streetTypes.Where(s => EF.Functions.Like(s.StreetTypeName.ToLower(), $"%{queryObject.StreetTypeName}%"));
            }

            int totalItems = await streetTypes.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalItems / queryObject.PageSize);
            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            List<StreetType> streetTypeList = await streetTypes.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return (streetTypeList, totalPages);
        }

        public async Task<StreetType?> GetByIdAsync(int id)
        {
            StreetType? streetType = await _context.StreetTypes.FirstOrDefaultAsync(s => s.Id == id);

            if (streetType == null)
            {
                return null;
            }

            return streetType;
        }

        public Task<bool> IsStreetTypeExistsAsync(int id)
        {
            return _context.StreetTypes.AnyAsync(s => s.Id == id);
        }

        public async Task<StreetType?> UpdateAsync(StreetType streetHistory, int id)
        {
            StreetType? streetType = _context.StreetTypes.FirstOrDefault(s => s.Id == id);

            if (streetType == null)
            {
                return null;
            }

            streetType.StreetTypeName = streetHistory.StreetTypeName;   
            streetType.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return streetType;
        }
    }
}