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
    public class StreetHistoryRepository : IStreetHistoryRepository
    {
        private readonly AppDbContext _context;
        public StreetHistoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<StreetHistory> CreateAsync(StreetHistory streetHistory)
        {
            StreetHistory newStreetHistory = new StreetHistory
            {
                Period = streetHistory.Period,
                Description = streetHistory.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                StreetId = streetHistory.StreetId
            };

            await _context.StreetHistories.AddAsync(newStreetHistory);
            await _context.SaveChangesAsync();
            return await Task.FromResult(newStreetHistory);
        }

        public async Task<StreetHistory?> DeleteAsync(int id)
        {
            StreetHistory? deleteStreetHistory = _context.StreetHistories.FirstOrDefault(s => s.Id == id);
            if (deleteStreetHistory == null)
            {
                return null;
            }

            _context.StreetHistories.Remove(deleteStreetHistory);
            await _context.SaveChangesAsync();
            return deleteStreetHistory;
        }

        public async Task<List<StreetHistory>> GetAllAsync()
        {
            return await _context.StreetHistories.ToListAsync();
        }

        public async Task<StreetHistory?> GetByIdAsync(int id)
        {
            StreetHistory? streetHistoryModel = await _context.StreetHistories.FirstOrDefaultAsync(s => s.Id == id);
            if (streetHistoryModel == null)
            {
                return null;
            }

            return streetHistoryModel;
        }

        public Task<List<StreetHistory>> GetHistoriesByStreetIdAsync(int streetId)
        {
            return _context.StreetHistories.Where(h => h.StreetId == streetId).ToListAsync();
        }

        public async Task<StreetHistory?> UpdateAsync(StreetHistory streetHistoryModel, int id)
        {
            StreetHistory? existingStreetHistory = await _context.StreetHistories.FirstOrDefaultAsync(s => s.Id == id);
            if (existingStreetHistory == null)
            {
                return null;
            }

            existingStreetHistory.Period = streetHistoryModel.Period;
            existingStreetHistory.Description = streetHistoryModel.Description;
            existingStreetHistory.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return existingStreetHistory;
        }
    }
}