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
        public GeoJsonLineStringDto? Route { get; set; } = new GeoJsonLineStringDto([]);
        public GeoJsonLineStringDto? WayPoints { get; set; } = new GeoJsonLineStringDto([]);
        public List<CreateStreetImageRequestDto>? StreetImages { get; set; }
    }
}