using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/image")]
    public class ImageController : ControllerBase
    {
        private readonly IImageUploadService _imageService;
        private readonly IWebHostEnvironment _env;

        public ImageController(IImageUploadService imageService, IWebHostEnvironment env)
        {
            _imageService = imageService;
            _env = env;
        }
        
        [HttpPost("upload"), Authorize]
        public IActionResult UploadImage(IFormFile file)
        {
            try
            {
                var uploadResult = _imageService.UploadImageAsync(file).Result;

                if (uploadResult == null)            
                    return BadRequest("File is empty");

                return Ok(new { url = uploadResult.SecureUrl, publicId = uploadResult.PublicId });
            }
            catch (Exception ex)
            {
                if (_env.IsDevelopment())
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete/{publicId}"), Authorize]
        public IActionResult DeleteImage(string publicId)
        {
            if (string.IsNullOrWhiteSpace(publicId))
            {
                return BadRequest("PublicId is required");
            }

            try
            {
                var deletionResult = _imageService.DeleteImageAsync(publicId).Result;
                if (deletionResult.Result == "ok")
                    return Ok("Image deleted");
                return BadRequest("Error deleting image");
            }
            catch (Exception ex)
            {
                if (_env.IsDevelopment())
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}