using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace be.Dtos
{
    public class StreetDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string StreetName { get; set; } = "";
        public string StreetType { get; set; } = "";
        public string Description { get; set; } = "";
        public LineString Route { get; set; } = new LineString([]);
        public LineString WayPoints { get; set; } = new LineString([]);
    }
}