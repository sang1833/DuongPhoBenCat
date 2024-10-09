using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetHistory
{
    public class UpdateStreetHistoryRequestDto
    {
        [Required]
        public required string Period { get; set; }
        [Required]
        public required string Description { get; set; }
    }
}