using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly UserManager<AppUser> _userManager;

        public DashboardController(
            IStreetRepository streetRepo,
            IVisitorRepository visitorRepo,
            UserManager<AppUser> userManager
        )
        {
            _streetRepo = streetRepo;
            _visitorRepo = visitorRepo;
            _userManager = userManager;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            await Task.Delay(100);

            return Ok(new { message = "Dashboard data" });
        }
    }
}