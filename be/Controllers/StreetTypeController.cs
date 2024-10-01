using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetType;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/streetType")]
    public class StreetTypeController : ControllerBase
    {
        private readonly IStreetTypeRepository _streetTypeRepo;

        public StreetTypeController(IStreetTypeRepository streetTypeRepo)
        {
            _streetTypeRepo = streetTypeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] STypeQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (IEnumerable<StreetType> streetTypeModels, int totalPages) = await _streetTypeRepo.GetAllAsync(queryObject);
            IEnumerable<FullyStreetTypeDto> fStreetTypeDtos = streetTypeModels.Select(s => s.ToFullyStreetTypeDto());

            return Ok(new { streetTypes = fStreetTypeDtos, totalPages });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetType? streetTypeModel = await _streetTypeRepo.GetByIdAsync(id);

            if (streetTypeModel == null)
            {
                return NotFound();
            }

            return Ok(streetTypeModel.ToStreetTypeDto());
        }

        [HttpPost, Authorize(Roles = "Admin,SupAdmin")]
        public async Task<IActionResult> Create([FromBody] CreateStreetTypeRequestDto createStreetTypeRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetType streetType = createStreetTypeRequestDto.ToStreetTypeFromCreateDto();
            await _streetTypeRepo.CreateAsync(streetType);

            return Ok(streetType.ToFullyStreetTypeDto());
        }

        [HttpPut("{id:int}"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<IActionResult> Update([FromBody] UpdateStreetTypeRequestDto updateStreetTypeRequestDto, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetType? streetType = await _streetTypeRepo.GetByIdAsync(id);

            if (streetType == null)
            {
                return NotFound();
            }

            StreetType updatingStreetType = updateStreetTypeRequestDto.ToStreetTypeFromUpdateDto();
            StreetType? updatedStreetType = await _streetTypeRepo.UpdateAsync(updatingStreetType, id);

            if (updatedStreetType == null)
            {
                return BadRequest("Server error");
            }

            return Ok(updatedStreetType.ToFullyStreetTypeDto());
        }

        [HttpDelete("{id:int}"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<IActionResult> Delete(int id){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetType? streetType = await _streetTypeRepo.DeleteAsync(id);

            if (streetType == null)
            {
                return NotFound();
            }

            return Ok(streetType.ToStreetTypeDto());
        }
    }
}