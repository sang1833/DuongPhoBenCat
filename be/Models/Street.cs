using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace be.Models
{
    public class Street
    {
        [Key]
        public int Id {  get; set; }
        [Required]
        public string StreetName { get; set; } = "";
        public string Address { get; set; } = "";
        public string Description { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public LineString? Route { get; set; }
        public LineString? WayPoints { get; set; }
        public LineString? ManualRoute { get; set; }
        public LineString? ManualWayPoints { get; set; }
        public bool IsApproved { get; set; }
        public List<StreetHistory> Histories { get; set; } = new List<StreetHistory>();
        public List<StreetImage> Images { get; set; } = new List<StreetImage>();
        public required int StreetTypeId { get; set; }
        public StreetType? StreetType { get; set; }
    }
}