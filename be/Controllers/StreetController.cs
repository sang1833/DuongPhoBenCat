using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos;
using be.Dtos.Street;
using be.Dtos.StreetImage;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/street")]
    public class StreetController : ControllerBase
    {
        private readonly IStreetRepository _streetRepo;
        private readonly IStreetHistoryRepository _streetHistoryRepo;
        private readonly IStreetImageRepository _streetImageRepo;

        public StreetController(IStreetRepository streetRepository, IStreetHistoryRepository streetHistoryRepository, IStreetImageRepository streetImageRepository)
        {
            _streetRepo = streetRepository;
            _streetHistoryRepo = streetHistoryRepository;
            _streetImageRepo = streetImageRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.GetAllAsync(queryObject);
            IEnumerable<StreetDto> streetDtos = streets.Select(s => s.ToStreetDto()).ToList();
            return Ok(new { Streets = streets, TotalPages = totalPages });
        }

        [HttpGet] 
        [Route("adminSearch")]
        public async Task<IActionResult> SearchAdmin([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.SearchAdminAsync(queryObject);
            IEnumerable<SearchStreetAdminDto> streetDtos = streets.Select(s => s.ToSearchStreetAdminDto()).ToList();
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
        }

        [HttpGet] 
        [Route("userSearch")]
        public async Task<IActionResult> SearchUser([FromQuery] string searchParam)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IEnumerable<Street> streets = await _streetRepo.SearchAllAsync(searchParam);
            IEnumerable<SearchStreetUserDto> streetDtos = streets.Select(s => s.ToSearchStreetUserDto()).ToList();
            return Ok(streetDtos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }
            StreetDto streetDto = street.ToStreetDto();

            return Ok(streetDto);
        }

        /// <summary>
        /// Carefully with Route and WayPoints coordinates
        /// </summary>
        [HttpPost("adminCreate")]
        public async Task<IActionResult> AdminCreate([FromBody] CreateStreetRequestDto streetDto)
        {  
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });
            else if (streetDto?.Route?.Coordinates.Count < 2 || streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            Street createdStreet = await _streetRepo.CreateAsync(streetDto?.ToStreetFromCreateDto());
            
            if (streetDto != null && streetDto.StreetImages != null)
            {
                foreach (CreateStreetImageRequestDto streetImage in streetDto.StreetImages)
                {
                    try {
                        await _streetImageRepo.CreateAsync(streetImage.ToStreetImageFromCreateDto(createdStreet.Id));
                    }
                    catch (Exception e) {
                        return BadRequest(new { message = $"Error when create image: {streetImage.ImageUrl}, Decription: ", e.Message });
                    }
                }
            }

            return CreatedAtAction(nameof(GetById), new { id = createdStreet.Id }, createdStreet.ToStreetDto());
        }

        /// <summary>
        /// Carefully with Route and WayPoints coordinates
        /// </summary>
        /// <remarks>
        /// Routes / WayPoints coordinates example (At least 2 points are required because it is a LineString):   
        /// {
        ///     "route": {  
        ///       "type": "LineString",  
        ///       "coordinates": [  
        ///         [  
        ///           40.712776,  
        ///           -74.005974  
        ///         ],  
        ///         [  
        ///           40.713776,  
        ///           -74.006974   
        ///         ]  
        ///       ]  
        ///     },  
        ///     "wayPoints": {  
        ///       "type": "LineString",  
        ///       "coordinates": [  
        ///         [  
        ///           40.712776,  
        ///          -74.005974  
        ///         ],  
        ///         [  
        ///           40.713776,  
        ///           -74.006974  
        ///         ],  
        ///         [  
        ///           40.714776,  
        ///           -74.007974  
        ///         ]
        ///       ]
        ///     }
        ///   }
        ///   </remarks>
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });
            else if (streetDto?.Route?.Coordinates.Count < 2 || streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            Street? updatedStreet = await _streetRepo.UpdateAsync(streetDto?.ToStreetFromUpdateDto(), id);
            if (updatedStreet == null)
            {
                return NotFound();
            }
            return Ok(updatedStreet.ToStreetDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? deletedStreet = await _streetRepo.DeleteAsync(id);

            if (deletedStreet == null)
            {
                return NotFound();
            }

            return Ok(new { message = "Street deleted successfully", deletedStreet});
        }
    }
}