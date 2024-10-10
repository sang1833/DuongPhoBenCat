using be.Dtos;
using be.Dtos.Street;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet, Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(StreetDto, int)>> GetAll([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.GetAllAsync(queryObject);
            IEnumerable<StreetDto> streetDtos = streets.Select(s => s.ToStreetDto()).ToList();
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
        }

        [HttpGet, Authorize]
        [Route("adminSearch")]
        public async Task<ActionResult<(StreetDto, int)>> SearchAdmin([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.SearchAdminAsync(queryObject);
            IEnumerable<SearchStreetAdminDto> streetDtos = streets.Select(s => s.ToSearchStreetAdminDto()).ToList();
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
        }

        [HttpGet]
        [Route("userSearch")]
        public async Task<ActionResult<(StreetDto, string)>> SearchUser([FromQuery] string searchParam)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IEnumerable<Street> streets = await _streetRepo.SearchAllAsync(searchParam);
            IEnumerable<SearchStreetUserDto> streetDtos = streets.Select(s => s.ToSearchStreetUserDto()).ToList();
            return Ok(streetDtos);
        }

        [HttpGet("{id:int}"), Authorize]
        public async Task<ActionResult<(StreetDto, string)>> GetById([FromRoute] int id)
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

        [HttpGet("userGetDetail/{streetId:int}")]
        public async Task<ActionResult<(StreetDto, string)>> GetByIdUser([FromRoute] int streetId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? street = await _streetRepo.GetByIdUserAsync(streetId);
            if (street == null)
            {
                return NotFound();
            }
            StreetDto streetDto = street.ToStreetDto();

            return Ok(streetDto);
        }

        [HttpPost("create"), Authorize]
        
        public async Task<ActionResult<(string, StreetDto)>> Create([FromBody] CreateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (!await _streetTypeRepo.IsStreetTypeExistsAsync(streetDto.StreetTypeId))
                return BadRequest("Street type not found");
            else if (streetDto?.Route?.Coordinates.Count < 2 || streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });

            Street createdStreet = streetDto.ToStreetFromCreateDto();
            createdStreet.IsApproved = User.IsInRole("Admin") || User.IsInRole("SupAdmin");

            createdStreet = await _streetRepo.CreateAsync(createdStreet);

            if (streetDto != null && streetDto.StreetImages != null)
            {
                foreach (CreateStreetImageRequestDto streetImage in streetDto.StreetImages)
                {
                    try
                    {
                        await _streetImageRepo.CreateAsync(streetImage.ToStreetImageFromCreateDto(createdStreet.Id));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = $"Error when create image: {streetImage.ImageUrl}, Decription: ", e.Message });
                    }
                }
            }
            
            if (streetDto != null && streetDto.StreetHistories != null)
            {
                foreach (CreateStreetHistoryRequestDto streetHistory in streetDto.StreetHistories)
                {
                    try
                    {
                        await _streetHistoryRepo.CreateAsync(streetHistory.ToStreetHistoryFromCreateDto(createdStreet.Id));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = $"Error when create history: {streetHistory.Period}, Decription: ", e.Message });
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
        [HttpPut("{id:int}"), Authorize]
        public async Task<ActionResult<(StreetDto, string)>> Update(int id, [FromBody] UpdateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });
            else if (streetDto?.Route?.Coordinates.Count < 2 || streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            Street? existingStreet = await _streetRepo.GetByIdAsync(id);
            if (existingStreet == null || streetDto == null)
            {
                return NotFound();
            }

            Street? updatedStreet = streetDto.ToStreetFromUpdateDto();
            updatedStreet.Id = id;
            updatedStreet.IsApproved = User.IsInRole("Admin") || User.IsInRole("SupAdmin");

            updatedStreet = await _streetRepo.UpdateAsync(updatedStreet, id);

            if (updatedStreet == null)
            {
                return NotFound();
            }

            if (streetDto != null && streetDto.StreetHistories != null)
            {
                foreach (CreateStreetHistoryRequestDto streetHistory in streetDto.StreetHistories)
                {
                    try
                    {
                        await _streetHistoryRepo.CreateAsync(streetHistory.ToStreetHistoryFromCreateDto(updatedStreet.Id));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = $"Error when create history: {streetHistory.Period}, Decription: ", e.Message });
                    }
                }
            }

            List<StreetImage> existingImages = await _streetImageRepo.GetImagesByStreetIdAsync(id);
            List<CreateStreetImageRequestDto> newStreetImages = streetDto?.StreetImages ?? new List<CreateStreetImageRequestDto>();

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
                    Console.WriteLine(new { message = $"Error when updating image: {image.ImageUrl}, Description: {e.Message}" });
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

        [HttpDelete("{id:int}"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, Street)>> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? deletedStreet = await _streetRepo.DeleteAsync(id);

            if (deletedStreet == null)
            {
                return NotFound();
            }

            return Ok(new { message = "Street deleted successfully", deletedStreet });
        }

        [HttpPost("{id:int}/approveStreet"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, StreetDto)>> ApproveStreet(int id)
        {
            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            street.IsApproved = true;
            await _streetRepo.UpdateAsync(street, id);

            return Ok(new { message = "Street approved successfully", street = street.ToStreetDto() });
        }

        [HttpPost("{id:int}/rejectStreet"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, StreetDto)>> RejectStreet(int id)
        {
            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            street.IsApproved = false;
            await _streetRepo.UpdateAsync(street, id);

            return Ok(new { message = "Street rejected successfully", street = street.ToStreetDto() });
        }
    }
}