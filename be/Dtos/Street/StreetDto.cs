using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using be.Dtos.StreetType;
using NetTopologySuite.Geometries;

namespace be.Dtos
{
    public class StreetDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string StreetName { get; set; }
        public StreetTypeDto? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public LineString? Route { get; set; }
        public LineString? WayPoints { get; set; }
        public List<StreetHistoryDto>? Histories { get; set; }
        public List<ImageInStreetDto>? Images { get; set; }
    }
}