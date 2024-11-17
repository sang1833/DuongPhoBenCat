using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Dtos.TrackRequest;
using be.Helpers;
using be.Interfaces;
using be.Models;
using DocumentFormat.OpenXml.Drawing.ChartDrawing;
using Microsoft.EntityFrameworkCore;

namespace be.Services
{
    public class UserAccessRepository : IUserAccessRepository
    {
        private readonly AppDbContext _context;

        public UserAccessRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> TrackAccessAsync(TrackRequest request)
        {
            var existingRequest = await _context.TrackRequests.FirstOrDefaultAsync(r => r.Ip == request.Ip);

            if (existingRequest != null)
            {
                existingRequest.AccessNumber++;
                _context.TrackRequests.Update(existingRequest);
                await _context.SaveChangesAsync();

                return true;
            }

            _context.TrackRequests.Add(request);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<int> GetAccessCountAsync()
        {
            List<TrackRequest> trackRequests = await _context.TrackRequests.ToListAsync();

            return trackRequests.Sum(r => r.AccessNumber);
        }

        public async Task<(List<TrackRequest>, int)> GetAccessRequestsAsync(TrackRequestQueryObject queryObject)
        {
            IQueryable<TrackRequest> trackRequests = _context.TrackRequests.AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObject.Ip))
            {
                trackRequests = trackRequests.Where(s => EF.Functions.ILike(s.Ip.ToLower(), $"%{queryObject.Ip}%"));
            }

            if (!string.IsNullOrWhiteSpace(queryObject.City))
            {
                trackRequests = trackRequests.Where(s => EF.Functions.ILike(s.City.ToLower(), $"%{queryObject.City}%"));
            }

            int totalItems = await trackRequests.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)queryObject.PageSize);
            int skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;

            List<TrackRequest> pagedTrackRequests = await trackRequests.Skip(skipNumber).Take(queryObject.PageSize).ToListAsync();

            return (pagedTrackRequests, totalPages);
        }
    }
}