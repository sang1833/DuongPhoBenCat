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
                Period = dto.Period,
                Description = dto.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                StreetId = StreetId,
            };
        }

        public static HistoryInStreetDto ToHistoryInStreetDto(this StreetHistory streetHistoryModel)
        {
            return new HistoryInStreetDto
            {
                Id = streetHistoryModel.Id,
                Period = streetHistoryModel.Period,
                Description = streetHistoryModel.Description,
            };
        }

        public static StreetHistoryDto ToStreetHistoryDto(this StreetHistory streetHistoryModel)
        {
            return new StreetHistoryDto
            {
                Id = streetHistoryModel.Id,
                Period = streetHistoryModel.Period,
                Description = streetHistoryModel.Description,
                UpdatedDate = streetHistoryModel.UpdatedDate,
                CreatedDate = streetHistoryModel.CreatedDate,
                StreetId = streetHistoryModel.StreetId
            };
        }

        public static StreetHistory ToStreetHistoryFromUpdateDto(this UpdateStreetHistoryRequestDto dto)
        {
            return new StreetHistory
            {
                Period = dto.Period,
                Description = dto.Description,
                UpdatedDate = DateTime.Now
            };
        }
    }
}