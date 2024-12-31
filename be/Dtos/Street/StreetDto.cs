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
        public int StreetTypeId { get; set; }
        public StreetTypeDto? StreetType { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? Color { get; set; }
        public int? Weight { get; set; }
        public double? Opacity { get; set; } 
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsApproved { get; set; }
        public LineString? Route { get; set; }
        public LineString? WayPoints { get; set; }
        public LineString? ManualRoute { get; set; }
        public LineString? ManualWayPoints { get; set; }
        public List<HistoryInStreetDto>? Histories { get; set; }
        public List<ImageInStreetDto>? Images { get; set; }
        public void CombineRoutes()
        {
            if (Route != null && ManualRoute != null)
            {
                var combinedCoordinates = Route.Coordinates.Concat(ManualRoute.Coordinates).ToArray();
                Route = new LineString(combinedCoordinates);
            }
            else if (ManualRoute != null)
            {
                Route = ManualRoute;
            }
        }
    }
}