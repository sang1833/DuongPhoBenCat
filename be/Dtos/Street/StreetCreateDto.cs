using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace be.Dtos.Street
{
    public class StreetCreateDto : CreateStreetRequestDto
    {
        public int Id { get; set; }
        public new LineString? Route { get; set; }
        public new LineString? WayPoints { get; set; }
    }
}