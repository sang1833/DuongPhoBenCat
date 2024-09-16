using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos
{
    public class GeoJsonLineStringDto
    {
        public List<double[]> Coordinates { get; set; }

        public GeoJsonLineStringDto(List<double[]> coordinates)
        {
            Coordinates = coordinates;
        }
    }
}