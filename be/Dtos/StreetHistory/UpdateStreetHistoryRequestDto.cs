using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetHistory
{
    public class UpdateStreetHistoryRequestDto
    {
        public required string HistoryName { get; set; }
        public string? Content { get; set; }
    }
}