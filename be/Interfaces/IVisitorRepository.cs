using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        IEnumerable<Visitor> GetVisitorsToday();
        IEnumerable<Visitor> GetVisitorsThisWeek();
        IEnumerable<Visitor> GetVisitorsThisMonth();
        IEnumerable<Visitor> GetVisitorsThisYear();
        IEnumerable<Visitor> GetAllVisitors();
    }
}