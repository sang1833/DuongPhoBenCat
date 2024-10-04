using be.Dtos.StreetType;

namespace be.Dtos.Street
{
    public class SearchStreetAdminDto
    {
        public int Id { get; set; }
        public required string StreetName { get; set; }
        public StreetTypeDto? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsApproved { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}