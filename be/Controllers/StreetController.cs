using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/street")]
    public class StreetController : ControllerBase
    {
        private readonly IStreetRepository _streetRepository;

        public StreetController(IStreetRepository streetRepository)
        {
            _streetRepository = streetRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var streets = await _streetRepository.GetAllAsync(queryObject);
            return Ok(streets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var street = await _streetRepository.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }
            return Ok(street.ToStreetDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdStreet = await _streetRepository.CreateAsync(streetDto.ToStreetFromCreateDto());
            return CreatedAtAction(nameof(GetById), new { id = createdStreet.Id }, createdStreet);
        }
    }
}