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
        private readonly IUserAccessRepository _userAccessRepo;
        private readonly UserManager<AppUser> _userManager;

        public DashboardController(
            IStreetRepository streetRepo,
            IUserAccessRepository userAccessRepo,
            UserManager<AppUser> userManager
        )
        {
            _streetRepo = streetRepo;
            _userAccessRepo = userAccessRepo;
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