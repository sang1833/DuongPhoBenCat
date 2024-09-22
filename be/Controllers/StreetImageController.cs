using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/streetImage")]
    public class StreetImageController : ControllerBase
    {
        private readonly IStreetImageRepository _streetImageRepo;
        private readonly IStreetRepository _streetRepo;

        public StreetImageController(IStreetImageRepository streetImageRepository, IStreetRepository streetRepository)
        {
            _streetImageRepo = streetImageRepository;
            _streetRepo = streetRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IEnumerable<StreetImage> streetImages = await _streetImageRepo.GetAllAsync();
            IEnumerable<StreetImageDto> streetImageDtos = streetImages.Select(s => s.ToStreetImageDto());

            return Ok(streetImageDtos);
        }

        [HttpGet("{id:int}")]   
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetImage? streetImage = await _streetImageRepo.GetByIdAsync(id);
            if (streetImage == null)
            {
                return BadRequest("StreetImage not found");
            }

            return Ok(streetImage.ToStreetImageDto());
        }

        [HttpPost("{streetId}")]
        public async Task<IActionResult> Create([FromRoute] int streetId, [FromBody] CreateStreetImageRequestDto createStreetImageRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            else if (!await _streetRepo.IsStreetExistsAsync(streetId))
                return BadRequest("Street not found");

            StreetImage streetImage = createStreetImageRequestDto.ToStreetImageFromCreateDto(streetId);
            await _streetImageRepo.CreateAsync(streetImage);

            return CreatedAtAction(nameof(GetById), new { id = streetImage.Id }, streetImage.ToStreetImageDto());
        }
        
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateStreetImageRequestDto updateStreetImageDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetImage streetImage = updateStreetImageDto.ToStreetImageFromUpdateDto();
            StreetImage? updatedStreetImage = await _streetImageRepo.UpdateAsync(streetImage, id);

            if (updatedStreetImage == null)
            {
                return BadRequest("StreetImage not found");
            }

            return Ok(updatedStreetImage.ToStreetImageDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetImage? streetImages = await _streetImageRepo.DeleteAsync(id);
            if (streetImages == null)
            {
                return BadRequest("StreetImage not found");
            }

            return Ok(new { message = "StreetImage deleted successfully", streetImages = streetImages?.ToStreetImageDto() });
        }
    }
}