using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace be.Dtos
{
    public class CreateStreetRequestDto
    {
        [Required]
        public required string StreetName { get; set; }
        public string? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
    }
}