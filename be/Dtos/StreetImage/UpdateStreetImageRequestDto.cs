using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetHistory
{
    public class UpdateStreetImageRequestDto
    {
        [Required(ErrorMessage = "ImageUrl is required.")]
        public required string ImageUrl { get; set; }
        public string? PublicId { get; set; }
        public string? Description { get; set; }
    }
}