using be.Dtos;
using be.Dtos.Street;
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
                StreetType = streetCreateDto.StreetType ?? "",
                Address = streetCreateDto.Address ?? "",
                Description = streetCreateDto.Description ?? "",    
                ImageUrl = streetCreateDto.ImageUrl ?? "",
                UpdatedDate = DateTime.Now,
                CreatedDate = DateTime.Now,
                Route = new LineString(streetCreateDto?.Route?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                WayPoints = new LineString(streetCreateDto?.WayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray())
            };
        }

        public static StreetDto ToStreetDto(this Street street)
        {
            return new StreetDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetType = street.StreetType,
                Address = street.Address,
                Description = street.Description,
                ImageUrl = street.ImageUrl,
                UpdatedDate = street.UpdatedDate,
                CreatedDate = street.CreatedDate,
                Route = street.Route,
                WayPoints = street.WayPoints,
                Histories = street.Histories.Select(c => c.ToStreetHistoryDto()).ToList(),
                Images = street.Images.Select(c => c.ToImageInStreetDto()).ToList()
            };
        }

        public static SearchStreetAdminDto ToSearchStreetAdminDto(this Street street)
        {
            return new SearchStreetAdminDto
            {
                Id = street.Id,
                StreetName = street.StreetName,
                StreetType = street.StreetType,
                Address = street.Address,
                Description = street.Description,
                ImageUrl = street.ImageUrl,
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
                StreetType = street.StreetType,
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
                StreetType = streetUpdateDto.StreetType ?? "",
                Address = streetUpdateDto.Address ?? "",
                Description = streetUpdateDto.Description ?? "",
                ImageUrl = streetUpdateDto.ImageUrl ?? "",
                UpdatedDate = DateTime.Now,
                Route = new LineString(streetUpdateDto?.Route?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray()),
                WayPoints = new LineString(streetUpdateDto?.WayPoints?.Coordinates.Select(coord => new Coordinate(coord[0], coord[1])).ToArray())
            };
        }
    }
}