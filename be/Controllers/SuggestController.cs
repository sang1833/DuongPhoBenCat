using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Suggestion;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/suggestion")]
    public class SuggestController : ControllerBase
    {
        private readonly ISuggestRepository _suggestRepository;

        public SuggestController(ISuggestRepository suggestRepository)
        {
            _suggestRepository = suggestRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<(Suggestion, int)>> GetAll([FromQuery] SuggestQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Suggestion> suggestions, int totalPages) = await _suggestRepository.GetAllAsync(queryObject);

            return Ok(new { suggestions, totalPages });
        }

        [HttpPost]
        public async Task<ActionResult<SuggestionDto>> Create([FromBody] CreateSuggestionRequestDto suggestionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            else if (suggestionDto.Title == "" && suggestionDto.Content == "")
                return BadRequest(new { message = "Title and content cannot be empty at same time" });

            Suggestion createdSuggestion = await _suggestRepository.CreateAsync(suggestionDto.ToSuggestionFromCreateDto());

            return Ok(createdSuggestion.ToDto());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<SuggestionDto>> GetById([FromRoute]int id)
        {
            Suggestion? suggestion = await _suggestRepository.GetByIdAsync(id);

            if (suggestion == null)
                return NotFound();

            return Ok(suggestion.ToDto());
        }
    }
}