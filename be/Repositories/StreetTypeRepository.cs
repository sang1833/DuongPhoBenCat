using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
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

        public async Task<List<StreetType>> GetAllAsync()
        {
            return await _context.StreetTypes.ToListAsync();
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