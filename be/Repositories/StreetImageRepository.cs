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
    public class StreetImageRepository : IStreetImageRepository
    {
        private readonly AppDbContext _context;

        public StreetImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<StreetImage> CreateAsync(StreetImage streetImageModel)
        {
            await _context.StreetImages.AddAsync(streetImageModel);
            await _context.SaveChangesAsync();
            return streetImageModel;
        }

        public async Task<StreetImage?> DeleteAsync(int id)
        {
            StreetImage? deleteStreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.Id == id);
            if (deleteStreetImage == null)
            {
                return null;
            }

            _context.StreetImages.Remove(deleteStreetImage);
            await _context.SaveChangesAsync();
            return deleteStreetImage;
        }

        public async Task<List<StreetImage>> GetAllAsync()
        {
            return await _context.StreetImages.ToListAsync();
        }

        public async Task<StreetImage?> GetByIdAsync(int id)
        {
            StreetImage? streetImageModel = await _context.StreetImages.FirstOrDefaultAsync(s => s.Id == id);

            if (streetImageModel == null)
            {
                return null;
            }

            return streetImageModel;
        }

        public async Task<StreetImage?> UpdateAsync(StreetImage streetImage, int id)
        {
            StreetImage? existingstreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.Id == id);

            if (existingstreetImage == null)
            {
                return null;
            }

            existingstreetImage.ImageUrl = streetImage.ImageUrl;
            existingstreetImage.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return existingstreetImage;
        }
    }
}