using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Interfaces;
using be.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class StreetImageRepository : IStreetImageRepository
    {
        private readonly AppDbContext _context;
        private readonly IImageUploadService _imageUploadService;

        public StreetImageRepository(AppDbContext context, IImageUploadService imageUploadService)
        {
            _context = context;
            _imageUploadService = imageUploadService;
        }

        public async Task<StreetImage> CreateAsync(StreetImage streetImageModel)
        {
            await _context.StreetImages.AddAsync(streetImageModel);
            await _context.SaveChangesAsync();
            return streetImageModel;
        }

        public async Task<StreetImage?> DeleteAsync(int id)
        {
            try
            {   
                StreetImage? deleteStreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.Id == id);
                if (deleteStreetImage == null)
                {
                    return null;
                }

                DeletionResult deleteImageResult = await _imageUploadService.DeleteImageAsync(deleteStreetImage.PublicId);
                if (deleteImageResult.Error != null)
                {
                    return null;
                }

                _context.StreetImages.Remove(deleteStreetImage);
                await _context.SaveChangesAsync();
                return deleteStreetImage;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<StreetImage?> DeletePublicIdAsync(string publicId)
        {
            try
            {   
                StreetImage? deleteStreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.PublicId == publicId);
                if (deleteStreetImage == null)
                {
                    return null;
                }

                DeletionResult deleteImageResult = await _imageUploadService.DeleteImageAsync(publicId);
                if (deleteImageResult.Error != null)
                {
                    return null;
                }

                _context.StreetImages.Remove(deleteStreetImage);
                await _context.SaveChangesAsync();
                return deleteStreetImage;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
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

        public Task<List<StreetImage>> GetImagesByStreetIdAsync(int streetId)
        {
            return _context.StreetImages.Where(s => s.StreetId == streetId).ToListAsync();
        }

        public Task<bool> IsStreetImageExistsAsync(int id)
        {
            return _context.StreetImages.AnyAsync(s => s.Id == id);
        }

        public async Task<StreetImage?> UpdateAsync(StreetImage streetImage, int id)
        {
            StreetImage? existingstreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.Id == id);

            if (existingstreetImage == null)
            {
                return null;
            }

            existingstreetImage.ImageUrl = streetImage.ImageUrl;
            existingstreetImage.PublicId = streetImage.PublicId;
            existingstreetImage.Description = streetImage.Description;
            existingstreetImage.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return existingstreetImage;
        }

        public async Task<StreetImage?> UpdatePublicIdAsync(StreetImage streetImage)
        {
             StreetImage? existingstreetImage = await _context.StreetImages.FirstOrDefaultAsync(s => s.PublicId == streetImage.PublicId);

            if (existingstreetImage == null)
            {
                return null;
            }

            existingstreetImage.ImageUrl = streetImage.ImageUrl;
            existingstreetImage.Description = streetImage.Description;
            existingstreetImage.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return existingstreetImage;
        }
    }
}