using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Threading.Tasks;
using be.Dtos.StreetHistory;
using be.Models;

namespace be.Mappers
{
    public static class StreetHistoryMappers
    {
        public static StreetHistory ToStreetHistoryFromCreateDto(this CreateStreetHistoryRequestDto dto, int StreetId)
        {
            return new StreetHistory
            {
                HistoryName = dto.HistoryName,
                Content = dto.Content,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                StreetId = StreetId,

            };
        }

        public static StreetHistoryDto ToStreetHistoryDto(this StreetHistory streetHistoryModel)
        {
            return new StreetHistoryDto
            {
                Id = streetHistoryModel.Id,
                HistoryName = streetHistoryModel.HistoryName,
                Content = streetHistoryModel.Content,
                UpdatedDate = streetHistoryModel.UpdatedDate,
                CreatedDate = streetHistoryModel.CreatedDate,
                StreetId = streetHistoryModel.StreetId
            };
        }

        public static StreetHistory ToStreetHistoryFromUpdateDto(this UpdateStreetHistoryRequestDto dto)
        {
            return new StreetHistory
            {
                HistoryName = dto.HistoryName,
                Content = dto.Content,
                UpdatedDate = DateTime.Now
            };
        }
    }
}