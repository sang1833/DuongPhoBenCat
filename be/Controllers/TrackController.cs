using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.TrackRequest;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/track")]
    public class TrackController : ControllerBase
{
    private readonly IUserAccessRepository _userAccessRepo;

    public TrackController(IUserAccessRepository userAccessRepo)
    {
        _userAccessRepo = userAccessRepo;
    }

    [HttpPost]
    public async Task<IActionResult> Track([FromBody] TrackRequestDto request)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        TrackRequest trackRequest = new TrackRequest
        {
            Ip = request.Ip,
            Hostname = request.Hostname,
            City = request.City,
            Region = request.Region,
            Country = request.Country,
            Loc = request.Loc,
            Org = request.Org,
            Postal = request.Postal,
            Timezone = request.Timezone,
            AccessNumber = 1
        };
        await _userAccessRepo.TrackAccessAsync(trackRequest);
        return Ok(new { message = "User access tracked" });
    }

    [HttpGet("count")]
    [Authorize(Roles = "Admin,SupAdmin")]
    public async Task<IActionResult> GetAccessCount()
    {
        var count = await _userAccessRepo.GetAccessCountAsync();
        return Ok(new { accessCount = count });
    }

    [HttpGet("requests")]
    [Authorize(Roles = "Admin,SupAdmin")]
    public async Task<IActionResult> GetAccessRequests(
        [FromQuery] TrackRequestQueryObject queryObject
    )
    {
        var (requests, totalPages) = await _userAccessRepo.GetAccessRequestsAsync(queryObject);
        
        return Ok(
            new {
                message = "Access requests retrieved",
                requests,
                totalPages
            }
        );
    }
}
}