using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetImage
{
    public class StreetImageDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string ImageUrl { get; set; }
        public string? Description { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        [Required]
        public int StreetId { get; set; }
    }
}