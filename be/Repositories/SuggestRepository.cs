using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using be.Data;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class SuggestRepository : ISuggestRepository
    {
        private readonly AppDbContext _context;

        public SuggestRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Suggestion> CreateAsync(Suggestion suggestion)
        {
            if (suggestion == null)
            {
                throw new Exception("Suggestion is null");
            }

            await _context.Suggestions.AddAsync(suggestion);
            await _context.SaveChangesAsync();

            return suggestion;
        }

        public async Task<(List<Suggestion>, int)> GetAllAsync(SuggestQueryObject queryObject)
        {
            IQueryable<Suggestion> suggestions = _context.Suggestions.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Title))
            {
                suggestions = suggestions.Where(s => EF.Functions.ILike(s.Title.ToLower(), $"%{queryObject.Title}%"));
            }

            if (!string.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                suggestions = queryObject.SortBy.ToLower() switch
                {
                    "createdDate" => queryObject.IsDescending ? suggestions.OrderByDescending(u => u.CreatedDate) : suggestions.OrderBy(u => u.CreatedDate),
                    _ => suggestions.OrderByDescending(u => u.CreatedDate),
                };
            }

            int totalItems = await suggestions.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalItems / queryObject.PageSize);
            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            List<Suggestion> suggestionList = await suggestions.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return (suggestionList, totalPages);
            }

        public async Task<Suggestion?> GetByIdAsync(int id)
        {
            Suggestion? suggestion = await _context.Suggestions.FirstOrDefaultAsync(s => s.Id == id);

            return suggestion;
        }
    }
}