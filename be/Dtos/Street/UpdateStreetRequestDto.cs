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
        [Range(1, int.MaxValue, ErrorMessage = "StreetTypeId is greater than 1.")]
        public int StreetTypeId { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsApproved { get; set; }
        public string? Color { get; set; } = "#3388ff";
        public int? Weight { get; set; } = 5;
        public double? Opacity { get; set; } = 1.0;
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? ManualRoute { get; set; }
        public GeoJsonLineStringDto? ManualWayPoints { get; set; }
        public List<CreateStreetImageRequestDto>? Images { get; set; }
        public List<HistoryInStreetDto>? Histories { get; set; }
    }
}