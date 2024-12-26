using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using System.ComponentModel.DataAnnotations;

namespace be.Dtos
{
    public class CreateStreetRequestDto
    {
        [Required(ErrorMessage = "StreetName is required.")]
        public required string StreetName { get; set; }
        [Required(ErrorMessage = "StreetType is required.")]
        public int StreetTypeId { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? Color { get; set; } = "#3388ff";
        public int? Weight { get; set; } = 5;
        public double? Opacity { get; set; } = 1.0;
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? ManualRoute { get; set; }
        public GeoJsonLineStringDto? ManualWayPoints { get; set; }
        public List<CreateStreetHistoryRequestDto>? Histories { get; set; }
        public List<CreateStreetImageRequestDto>? Images { get; set; }
    }
}