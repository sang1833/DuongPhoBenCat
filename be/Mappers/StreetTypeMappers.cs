using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetType;
using be.Models;

namespace be.Mappers
{
    public static class StreetTypeMappers
    {
        public static StreetType ToStreetTypeFromCreateDto(this CreateStreetTypeRequestDto createDto)
        {
            return new StreetType
            {
                StreetTypeName = createDto.StreetTypeName,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };
        }

        public static FullyStreetTypeDto ToFullyStreetTypeDto(this StreetType streetType)
        {
            return new FullyStreetTypeDto
            {
                Id = streetType.Id,
                StreetTypeName = streetType.StreetTypeName,
                UpdatedDate = streetType.UpdatedDate,
                CreatedDate = streetType.CreatedDate,
            };   
        }

        public static StreetTypeDto ToStreetTypeDto(this StreetType streetType)
        {
            return new StreetTypeDto
            {
                Id = streetType.Id,
                StreetTypeName = streetType.StreetTypeName,
            };   
        }

        public static StreetType ToStreetTypeFromUpdateDto(this UpdateStreetTypeRequestDto updateDto)
        {
            return new StreetType
            {
                StreetTypeName = updateDto.StreetTypeName,
                UpdatedDate = DateTime.Now,
            };
        }
    }
}