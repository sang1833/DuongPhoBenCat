using be.Dtos;
using be.Dtos.Street;
using be.Dtos.StreetType;
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
                StreetTypeId = streetCreateDto.StreetTypeId,
                Address = streetCreateDto.Address ?? "",
                Description = streetCreateDto.Description ?? "",
                ImageUrl = streetCreateDto.ImageUrl ?? "",
                Route = new LineString(streetCreateDto?.Route?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                WayPoints = new LineString(streetCreateDto?.WayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                ManualRoute = new LineString(streetCreateDto?.ManualRoute?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                ManualWayPoints = new LineString(streetCreateDto?.ManualWayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray())
            };
        }

        public static StreetDto ToStreetDto(this Street street)
        {
            return new StreetDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetTypeId = street.StreetTypeId,
                StreetType = street.StreetType != null ? street.StreetType.ToStreetTypeDto() : new StreetTypeDto(),
                Address = street.Address,
                Description = street.Description,
                ImageUrl = street.ImageUrl,
                UpdatedDate = street.UpdatedDate,
                CreatedDate = street.CreatedDate,
                IsApproved = street.IsApproved,
                Route = street.Route,
                WayPoints = street.WayPoints,
                ManualRoute = street.ManualRoute,
                ManualWayPoints = street.ManualWayPoints,
                Histories = street.Histories.Select(c => c.ToHistoryInStreetDto()).ToList(),
                Images = street.Images.Select(c => c.ToImageInStreetDto()).ToList()
            };
        }

        public static StreetRouteDto ToStreetRouteDto(this Street street)
        {
            return new StreetRouteDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                Route = street.Route,
                ManualRoute = street.ManualRoute
            };
        }

        public static SearchStreetAdminDto ToSearchStreetAdminDto(this Street street)
        {
            return new SearchStreetAdminDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetType = street.StreetType != null ? street.StreetType.ToStreetTypeDto() : new StreetTypeDto(),
                Address = street.Address,
                Description = street.Description,
                ImageUrl = street.ImageUrl,
                IsApproved = street.IsApproved,
                UpdatedDate = street.UpdatedDate,
                CreatedDate = street.CreatedDate
            };
        }

        public static SearchStreetUserDto ToSearchStreetUserDto(this Street street)
        {
            return new SearchStreetUserDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetType = street.StreetType?.StreetTypeName ?? "",
                Address = street.Address,
                Description = street.Description,
                ImageUrl = street.ImageUrl,
            };
        }

        public static Street ToStreetFromUpdateDto(this UpdateStreetRequestDto streetUpdateDto)
        {
            return new Street
            {
                StreetName = streetUpdateDto.StreetName,
                StreetTypeId = streetUpdateDto.StreetTypeId,
                Address = streetUpdateDto.Address ?? "",
                Description = streetUpdateDto.Description ?? "",
                ImageUrl = streetUpdateDto.ImageUrl ?? "",
                IsApproved = streetUpdateDto.IsApproved,
                UpdatedDate = DateTime.Now,
                Route = new LineString(streetUpdateDto?.Route?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                WayPoints = new LineString(streetUpdateDto?.WayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                ManualRoute = new LineString(streetUpdateDto?.ManualRoute?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                ManualWayPoints = new LineString(streetUpdateDto?.ManualWayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray())
            };
        }
    }
}