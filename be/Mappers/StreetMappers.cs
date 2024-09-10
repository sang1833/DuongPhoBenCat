using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos;
using be.Models;
using NetTopologySuite.Geometries;

namespace be.Mappers
{
    public static class StreetMappers
    {
        public static Street ToStreetFromCreateDto(this CreateStreetRequestDto streetCreateDto)
        {
            return new Street
            {
                StreetName = streetCreateDto.StreetName,
                StreetType = streetCreateDto.StreetType,
                Description = streetCreateDto.Description,
                Route = new LineString(streetCreateDto.Route.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                WayPoints = new LineString(streetCreateDto.WayPoints.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray())
            };
        }

        public static StreetDto ToStreetDto(this Street street)
        {
            return new StreetDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetType = street.StreetType,
                Description = street.Description,
                Route = street.Route,
                WayPoints = street.WayPoints
            };
        }
    } 
}