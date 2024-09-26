using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using be.Models;

namespace be.Mappers
{
    public static class StreetImageMappers
    {
        public static StreetImage ToStreetImageFromCreateDto(this CreateStreetImageRequestDto createStreetImageRequestDto, int streetId)
        {
            return new StreetImage
            {
                ImageUrl = createStreetImageRequestDto.ImageUrl,
                PublicId = createStreetImageRequestDto.PublicId,
                Description = createStreetImageRequestDto.Description ?? "",
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                StreetId = streetId
            };
        }

        public static StreetImageDto ToStreetImageDto(this StreetImage streetImage)
        {
            return new StreetImageDto
            {
                Id = streetImage.Id,
                ImageUrl = streetImage.ImageUrl,
                PublicId = streetImage.PublicId,
                Description = streetImage.Description,
                UpdatedDate = streetImage.UpdatedDate,
                CreatedDate = streetImage.CreatedDate,
                StreetId = streetImage.StreetId
            };
        }

        public static ImageInStreetDto ToImageInStreetDto(this StreetImage streetImage)
        {
            return new ImageInStreetDto
            {
                Id = streetImage.Id,
                ImageUrl = streetImage.ImageUrl,
                PublicId = streetImage.PublicId,
                Description = streetImage.Description
            };
        }

        public static StreetImage ToStreetImageFromUpdateDto(this UpdateStreetImageRequestDto updateStreetImageRequestDto)
        {
            return new StreetImage
            {
                ImageUrl = updateStreetImageRequestDto.ImageUrl,
                PublicId = updateStreetImageRequestDto.PublicId ?? "",
                Description = updateStreetImageRequestDto.Description ?? "",
                UpdatedDate = DateTime.Now
            };
        }
    }
}