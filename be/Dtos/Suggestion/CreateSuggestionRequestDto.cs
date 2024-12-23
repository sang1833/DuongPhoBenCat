using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Suggestion
{
    public class CreateSuggestionRequestDto
    {
        [StringLength(100)]
        public string Title { get; set; } = "";
        [StringLength(1000)]
        public string Content { get; set; } = "";
    }
}