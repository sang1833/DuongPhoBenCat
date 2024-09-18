using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetImage;
using NetTopologySuite.Geometries;

namespace be.Dtos
{
    public class CreateStreetRequestDto
    {
        [Required(ErrorMessage = "StreetName is required.")]
        public required string StreetName { get; set; }
        [MaxLength(20, ErrorMessage = "StreetType should not exceed 20 characters.")]
        public string? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
        public List<CreateStreetImageRequestDto>? StreetImages { get; set; }
    }
}