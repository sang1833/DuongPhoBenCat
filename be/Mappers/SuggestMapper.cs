using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Suggestion;
using be.Models;

namespace be.Mappers
{
    public static class SuggestMapper
    {
        public static Suggestion ToSuggestionFromCreateDto(this CreateSuggestionRequestDto createDto)
        {
            return new Suggestion
            {
                Title = createDto.Title,
                Content = createDto.Content,
                CreatedDate = DateTime.Now,
            };
        }

        public static SuggestionDto ToDto(this Suggestion suggestion)
        {
            return new SuggestionDto
            {
                Id = suggestion.Id,
                Title = suggestion.Title,
                Content = suggestion.Content,
                CreatedDate = suggestion.CreatedDate,
            };
        }
    }
}