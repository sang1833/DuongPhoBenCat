using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Street
{
    public class SearchStreetUserDto
    {
        public required int Id { get; set; }
        public required string StreetName { get; set; }
        public string? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}