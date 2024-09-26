using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetImage
{
    public class StreetImageDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = "";
        public string PublicId { get; set; } = "";
        public string? Description { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? StreetId { get; set; } = null;
    }
}