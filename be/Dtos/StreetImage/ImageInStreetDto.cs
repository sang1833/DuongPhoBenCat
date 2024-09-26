using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetImage
{
    public class ImageInStreetDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = "";
        public string PublicId { get; set; } = "";
        public string? Description { get; set; }
    }
}