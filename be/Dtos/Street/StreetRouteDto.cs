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
    public class StreetRouteDto
    {
        public int Id { get; set; }
        public required string StreetName { get; set; }
        public LineString? Route { get; set; }
        public LineString? ManualRoute { get; set; }

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