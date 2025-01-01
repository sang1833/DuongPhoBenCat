using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Dashboard;
using be.Dtos.Visitor;
using be.Helpers;
using be.Models;
using DocumentFormat.OpenXml.Office2019.Presentation;

namespace be.Interfaces
{
    public interface IVisitorRepository
    {
        Task<Visitor> TrackVisitorAsync(Visitor request);
        Task<int> GetVisitorCountAsync();
        Task<int> GetVisitorVisitCountAsync();
        Task<(int, double)> GetVisitorTodayCountAsync();
        Task<AccessChartDto> GetAccessByDayAsync();
        Task<AccessChartDto> GetAccessByMonthAsync();
        Task<AccessChartDto> GetAccessByYearAsync();
    }
}