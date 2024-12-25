using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Visitor;
using be.Models;

namespace be.Mappers
{
    public static class VisitorMapper
    {
        public static Visitor ToVisitorFromCreateDto(this CreateVisitorRequestDto createDto)
        {
            return new Visitor
            {
                VisitorId = createDto.VisitorId,
                LastAccess = DateTime.Now
            };
        }

        public static VisitorDto MapToVisitorDto(this Visitor model)
        {
            return new VisitorDto
            {
                Id = model.Id,
                VisitorId = model.VisitorId,
                VisitCount = model.VisitCount,
                FirstVisit = model.FirstVisit,
                LastAccess = model.LastAccess
            };
        }
    }
}