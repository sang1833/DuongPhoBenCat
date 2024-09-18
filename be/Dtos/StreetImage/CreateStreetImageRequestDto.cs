using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetImage
{
    public class CreateStreetImageRequestDto
    {
        [Required(ErrorMessage = "ImageUrl is required.")]
        public required string ImageUrl { get; set; }
        [Required(ErrorMessage = "PublicId is required.")]
        public required string PublicId { get; set; }
        public string? Description { get; set; }
    }
}