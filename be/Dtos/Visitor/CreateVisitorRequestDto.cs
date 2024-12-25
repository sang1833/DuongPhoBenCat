using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Visitor
{
    public class CreateVisitorRequestDto
    {
        [Required]
        public required string VisitorId { get; set; }
    }
}