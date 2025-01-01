using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Dtos.Dashboard;
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
            return await _context.VisitorDetails.CountAsync();
        }

        public async Task<int> GetVisitorCountAsync()
        {
            return await _context.Visitors.CountAsync();
        }

        public async Task<Visitor> TrackVisitorAsync(Visitor request)
        {
            Visitor? visitor = _context.Visitors.FirstOrDefault(v => v.VisitorId == request.VisitorId);
        
            if (visitor == null)
            {
                visitor = new Visitor
                {
                    VisitorId = request.VisitorId,
                    VisitCount = 1,
                    FirstVisit = DateTime.Now,
                    LastAccess = DateTime.Now,
                    VisitorDetails = new List<VisitorDetail>
                    {
                        new VisitorDetail
                        {
                            VisitorId = request.VisitorId,
                            AccessTime = DateTime.Now
                        }
                    }
                };
        
                await _context.Visitors.AddAsync(visitor);
            }
            else
            {
                visitor.LastAccess = DateTime.Now;
                visitor.VisitCount++;
                visitor.VisitorDetails?.Add(new VisitorDetail
                {
                    VisitorId = request.VisitorId,
                    AccessTime = DateTime.Now
                });
            }
        
            await _context.SaveChangesAsync();
        
            return visitor;
        }

        public async Task<(int, double)> GetVisitorTodayCountAsync()
        {
            var today = DateTime.Today;
            var todayCount = await _context.VisitorDetails.CountAsync(v => v.AccessTime.Date == today);
            var yesterdayCount = await _context.VisitorDetails.CountAsync(v => v.AccessTime.Date == today.AddDays(-1));

            double changeValue = 0;
            if (yesterdayCount != 0)
            {
                changeValue = ((double)todayCount - yesterdayCount) / yesterdayCount * 100;
            }

            return (todayCount, changeValue);
        }

        public async Task<AccessChartDto> GetAccessByDayAsync()
        {
            var last7Days = DateTime.Today.AddDays(-6);
            var dateRange = Enumerable.Range(0, 7).Select(i => last7Days.AddDays(i)).ToList();
        
            var data = await _context.VisitorDetails
                .Where(v => v.AccessTime.Date >= last7Days)
                .GroupBy(v => v.AccessTime.Date)
                .Select(g => new AccessChartDto.AccessData
                {
                    Time = g.Key.ToString("dd-MM-yyyy"),
                    Count = g.Count()
                })
                .ToListAsync();
        
            var result = dateRange.Select(date => new AccessChartDto.AccessData
            {
                Time = date.ToString("dd-MM-yyyy"),
                Count = data.FirstOrDefault(d => d.Time == date.ToString("dd-MM-yyyy"))?.Count ?? 0
            }).ToList();
        
            return new AccessChartDto { Data = result };
        }
        
        public async Task<AccessChartDto> GetAccessByMonthAsync()
        {
            var last12Months = DateTime.Today.AddMonths(-11);
            var dateRange = Enumerable.Range(0, 12).Select(i => last12Months.AddMonths(i)).ToList();
        
            var data = await _context.VisitorDetails
                .Where(v => v.AccessTime >= last12Months)
                .GroupBy(v => new { v.AccessTime.Year, v.AccessTime.Month })
                .Select(g => new AccessChartDto.AccessData
                {
                    Time = new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MM-yyyy"),
                    Count = g.Count()
                })
                .ToListAsync();
        
            var result = dateRange.Select(date => new AccessChartDto.AccessData
            {
                Time = date.ToString("MM-yyyy"),
                Count = data.FirstOrDefault(d => d.Time == date.ToString("MM-yyyy"))?.Count ?? 0
            }).ToList();
        
            return new AccessChartDto { Data = result };
        }
        
        public async Task<AccessChartDto> GetAccessByYearAsync()
        {
            var lastYears = DateTime.Today.AddYears(-4).Year;
            var currentYear = DateTime.Today.Year;
            var yearRange = Enumerable.Range(lastYears, currentYear - lastYears + 1).ToList();
        
            var data = await _context.VisitorDetails
                .GroupBy(v => v.AccessTime.Year)
                .Select(g => new AccessChartDto.AccessData
                {
                    Time = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToListAsync();
        
            var result = yearRange.Select(year => new AccessChartDto.AccessData
            {
                Time = year.ToString(),
                Count = data.FirstOrDefault(d => d.Time == year.ToString())?.Count ?? 0
            }).ToList();
        
            return new AccessChartDto { Data = result };
        }
    }
}