using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/streetHistory")]
    public class StreetHistoryController : ControllerBase
    {
        private readonly IStreetHistoryRepository _streetHistoryRepo;
        private readonly IStreetRepository _streetRepo;

        public StreetHistoryController(IStreetHistoryRepository streetHistoryRepo, IStreetRepository streetRepo)
        {
            _streetHistoryRepo = streetHistoryRepo;
            _streetRepo = streetRepo;
        }

        [HttpGet]
        public async Task<ActionResult<StreetHistoryDto>> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IEnumerable<StreetHistory> streetHistoryModel = await _streetHistoryRepo.GetAllAsync();
            IEnumerable<StreetHistoryDto> streetHistoryDto = streetHistoryModel.Select(s => s.ToStreetHistoryDto()).ToList();
            return Ok(streetHistoryDto);
        }

        [HttpGet("street/{streetId:int}")]
        public async Task<ActionResult<List<StreetHistoryDto>>> GetHistoriesByStreetId(int streetId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            else if (!await _streetRepo.IsStreetExistsAsync(streetId))
                return BadRequest(new { message = "Đường không tồn tại" });

            List<StreetHistory> streetHistoryModel = await _streetHistoryRepo.GetHistoriesByStreetIdAsync(streetId);
            List<StreetHistoryDto> streetHistoryDto = streetHistoryModel.Select(s => s.ToStreetHistoryDto()).ToList();
            return Ok(new { message = "Lấy lịch sử đường thành công", streetHistoryDto });
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<StreetHistoryDto>> GetById(int id){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetHistory? streetHistoryModel = await _streetHistoryRepo.GetByIdAsync(id);
            
            if (streetHistoryModel == null)
            {
                return NotFound();
            }

            StreetHistoryDto streetHistoryDto = streetHistoryModel.ToStreetHistoryDto();
            return Ok(streetHistoryDto);
        }

        [HttpPost("{streetId}"), Authorize]
        public async Task<ActionResult<(string, StreetHistoryDto)>> Create([FromRoute] int streetId, [FromBody] CreateStreetHistoryRequestDto historyRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            else if (!await _streetRepo.IsStreetExistsAsync(streetId))
                return BadRequest("Street not found");
            
            StreetHistory streetHistoryModel = historyRequestDto.ToStreetHistoryFromCreateDto(streetId);
            await _streetHistoryRepo.CreateAsync(streetHistoryModel);

            return CreatedAtAction(nameof(GetById), new { id = streetHistoryModel.Id }, streetHistoryModel.ToStreetHistoryDto());
        }
        
        [HttpPut("{id:int}"), Authorize]
        public async Task<ActionResult<StreetHistoryDto>> Update(int id, [FromBody] UpdateStreetHistoryRequestDto streetHistoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            StreetHistory? updatedStreetHistory = await _streetHistoryRepo.UpdateAsync(streetHistoryDto.ToStreetHistoryFromUpdateDto(), id);
            if (updatedStreetHistory == null)
            {
                return NotFound();
            }

            return Ok(updatedStreetHistory.ToStreetHistoryDto());
        }

        [HttpDelete("{id:int}"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, StreetHistory)>> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            StreetHistory? deletedStreetHistory = await _streetHistoryRepo.DeleteAsync(id);
            if (deletedStreetHistory == null)
            {
                return NotFound();
            }

            return Ok(new { message = "StreetHistory deleted successfully", deletedStreetHistory });
        }
    }
}