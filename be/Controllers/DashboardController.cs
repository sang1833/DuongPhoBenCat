using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Dashboard;
using be.Interfaces;
using be.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IStreetRepository _streetRepo;
        private readonly IVisitorRepository _visitorRepo;
        private readonly IUserRepository _userRepo;

        public DashboardController(
            IStreetRepository streetRepo,
            IVisitorRepository visitorRepo,
            IUserRepository userRepo
        )
        {
            _streetRepo = streetRepo;
            _visitorRepo = visitorRepo;
            _userRepo = userRepo;
        }

        [HttpGet("getDashboard")]
        public async Task<ActionResult<DashboardReturnDto>> GetAll()
        {
            // Get visitor visit count
            int visitorVisitCount = await _visitorRepo.GetVisitorVisitCountAsync();

            // Get visitor today
            (int visitorsToday, double visitorsTodayChange) = await _visitorRepo.GetVisitorTodayCountAsync();

            // Get street count
            (int streetCount, double streetChange) = await _streetRepo.GetStreetCountWithChangeTodayAsync();

            // Get user count
            var userCount = await _userRepo.GetUserCount();

            // Get address chart
            var addressChart = await _streetRepo.GetAddressChartAsync();

            DashboardReturnDto returnDto = new DashboardReturnDto
            {
                TotalUserAccess = new TotalUserAccessCount
                {
                    Total = visitorVisitCount,
                },
                TotalUserToday = new TotalUserToday
                {
                    Total = visitorsToday,
                    ChangeValue = visitorsTodayChange
                },
                TotalStreetCount = new TotalStreetCount
                {
                    Total = streetCount,
                    ChangeValue = streetChange
                },
                TotalEmployeeCount = new TotalEmployeeCount
                {
                    Total = userCount,
                },
                AddressChart = addressChart
            };

            return Ok(returnDto);
        }
    
        [HttpGet("accessByDay")]
        public async Task<ActionResult<AccessChartDto>> GetAccessByDay()
        {
            var data = await _visitorRepo.GetAccessByDayAsync();
            return Ok(data);
        }

        [HttpGet("accessByMonth")]
        public async Task<ActionResult<AccessChartDto>> GetAccessByMonth()
        {
            var data = await _visitorRepo.GetAccessByMonthAsync();
            return Ok(data);
        }

        [HttpGet("accessByYear")]
        public async Task<ActionResult<AccessChartDto>> GetAccessByYear()
        {
            var data = await _visitorRepo.GetAccessByYearAsync();
            return Ok(data);
        }
    }
}