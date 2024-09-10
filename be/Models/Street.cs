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
        public string StreetType { get; set; } = "";
        public string Description { get; set; } = "";
        public required LineString Route { get; set; }
        public required LineString WayPoints { get; set; }
    }
}