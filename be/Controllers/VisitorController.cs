using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Visitor;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitorController : ControllerBase
    {
        private readonly IVisitorRepository _visitorRepo;

        public VisitorController(IVisitorRepository visitorRepo)
        {
            _visitorRepo = visitorRepo;
        }

        [HttpPost]
        public async Task<IActionResult> TrackVisitorAsync([FromBody] CreateVisitorRequestDto request)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Visitor visitor = request.ToVisitorFromCreateDto();
            Visitor result = await _visitorRepo.TrackVisitorAsync(visitor);

            return Ok(result.MapToVisitorDto());
        }
    }
}