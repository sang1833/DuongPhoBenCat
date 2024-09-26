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
        private readonly IStreetTypeRepository _streetTypeRepo;
        private readonly IStreetHistoryRepository _streetHistoryRepo;
        private readonly IStreetImageRepository _streetImageRepo;

        public StreetController(IStreetRepository streetRepository, IStreetTypeRepository streetTypeRepository, IStreetHistoryRepository streetHistoryRepository, IStreetImageRepository streetImageRepository)
        {
            _streetRepo = streetRepository;
            _streetTypeRepo = streetTypeRepository;
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
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
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
            else if (!await _streetTypeRepo.IsStreetTypeExistsAsync(streetDto.StreetTypeId))
                return BadRequest("Street type not found");
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

            List<StreetImage> existingImages = await _streetImageRepo.GetImagesByStreetIdAsync(id);
            List<CreateStreetImageRequestDto> newStreetImages;
            if (streetDto?.StreetImages?.Count > 0)
            {
                newStreetImages = streetDto.StreetImages;
            }
            else
            {
                newStreetImages = new List<CreateStreetImageRequestDto>();
            }
            Street? updatedStreet = await _streetRepo.UpdateAsync(streetDto?.ToStreetFromUpdateDto(), id);

            IActionResult updateImagesResult = await UpdateStreetImagesAsync(id, newStreetImages, existingImages);
            if (updateImagesResult is BadRequestObjectResult)
            {
                return BadRequest(updateImagesResult);
            }

            if (updatedStreet == null)
            {
                return NotFound();
            }
            return Ok(updatedStreet.ToStreetDto());
        }
        private async Task<IActionResult> UpdateStreetImagesAsync(int streetId, List<CreateStreetImageRequestDto> streetImages, List<StreetImage> existingImages)
        {
            var existingImagesDict = existingImages.ToDictionary(ei => ei.PublicId);

            // Find images to delete
            List<StreetImage> streetImagesToDelete = existingImages.Where(ei => !streetImages.Any(si => si.PublicId == ei.PublicId)).ToList();

            // Find images to update
            List<StreetImage> streetImagesToUpdate = existingImages.Where(ei => streetImages.Any(si => si.PublicId == ei.PublicId && si.Description != ei.Description)).ToList();

            // Find images to create
            List<CreateStreetImageRequestDto> streetImagesToCreate = streetImages.Where(si => !existingImagesDict.ContainsKey(si.PublicId)).ToList();

            // Delete images
            foreach (StreetImage image in streetImagesToDelete)
            {
                try
                {
                    await _streetImageRepo.DeleteAsync(image.Id);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when deleting image: {image.ImageUrl}, Description: {e.Message}" });
                }
            }

            // Update images
            foreach (StreetImage image in streetImagesToUpdate)
            {
                CreateStreetImageRequestDto streetImageToUpdate = streetImages.First(si => si.PublicId == image.PublicId);
                image.Description = streetImageToUpdate.Description ?? "";
                try
                {
                    await _streetImageRepo.UpdatePublicIdAsync(image);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when updating image: {image.ImageUrl}, Description: {e.Message}" });
                }
            }

            // Create new images
            foreach (CreateStreetImageRequestDto streetImageToCreate in streetImagesToCreate)
            {
                StreetImage newImage = new StreetImage
                {
                    StreetId = streetId,
                    ImageUrl = streetImageToCreate.ImageUrl,
                    PublicId = streetImageToCreate.PublicId,
                    Description = streetImageToCreate.Description ?? ""
                };
                try
                {
                    await _streetImageRepo.CreateAsync(newImage);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when creating image: {streetImageToCreate.ImageUrl}, Description: {e.Message}" });
                }
            }

            return Ok();
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