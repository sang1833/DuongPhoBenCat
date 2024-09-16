using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Models;

namespace be.Dtos.StreetHistory
{
    public class StreetHistoryDto
    {
        public int Id { get; set; }
        public required string HistoryName { get; set; }
        public string? Content { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int StreetId { get; set; }
    }
}