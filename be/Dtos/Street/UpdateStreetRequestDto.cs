using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;

namespace be.Dtos.Street
{
    public class UpdateStreetRequestDto
    {
        [Required(ErrorMessage = "StreetName is required.")]
        public required string StreetName { get; set; }
        [Required(ErrorMessage = "StreetType is required.")]
        [Range(1, 1, ErrorMessage = "StreetTypeId is greater than 1.")]
        public int StreetTypeId { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
        public List<CreateStreetImageRequestDto>? Images { get; set; }
        public List<HistoryInStreetDto>? Histories { get; set; }
    }
}