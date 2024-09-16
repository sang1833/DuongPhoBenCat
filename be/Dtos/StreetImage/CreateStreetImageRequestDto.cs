using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetImage
{
    public class CreateStreetImageRequestDto
    {
        public required string ImageUrl { get; set; }
        public string? Description { get; set; }
    }
}