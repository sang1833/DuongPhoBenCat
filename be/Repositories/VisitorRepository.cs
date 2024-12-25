using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Dtos.Visitor;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class VisitorRepository : IVisitorRepository
    {
        private readonly AppDbContext _context;

        public VisitorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetVisitorVisitCountAsync()
        {
            return await _context.Visitors.SumAsync(v => v.VisitCount);
        }

        public async Task<int> GetVisitorCountAsync()
        {
            return await _context.Visitors.CountAsync();
        }

        public async Task<Visitor> TrackVisitorAsync(Visitor request)
        {
            var visitor = _context.Visitors.FirstOrDefault(v => v.VisitorId == request.VisitorId);

            if (visitor == null)
            {
                visitor = new Visitor
                {
                    VisitorId = request.VisitorId,
                    FirstVisit = DateTime.Now,
                    LastAccess = DateTime.Now,
                    VisitCount = 1
                };

                await _context.Visitors.AddAsync(visitor);
            }
            else
            {
                visitor.LastAccess = DateTime.Now;
                visitor.VisitCount++;
            }

            await _context.SaveChangesAsync();

            return visitor;
        }

        public IEnumerable<Visitor> GetVisitorsToday()
        {
            var today = DateTime.Today;
            return _context.Visitors.Where(v => v.LastAccess.Date == today);
        }

        public IEnumerable<Visitor> GetVisitorsThisWeek()
        {
            var startOfWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);
            return _context.Visitors.Where(v => v.LastAccess >= startOfWeek);
        }

        public IEnumerable<Visitor> GetVisitorsThisMonth()
        {
            var startOfMonth = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
            return _context.Visitors.Where(v => v.LastAccess >= startOfMonth);
        }

        public IEnumerable<Visitor> GetVisitorsThisYear()
        {
            var startOfYear = new DateTime(DateTime.Today.Year, 1, 1);
            return _context.Visitors.Where(v => v.LastAccess >= startOfYear);
        }

        public IEnumerable<Visitor> GetAllVisitors()
        {
            return _context.Visitors;
        }
    }
}