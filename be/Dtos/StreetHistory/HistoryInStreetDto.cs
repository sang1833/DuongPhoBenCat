using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.StreetHistory
{
    public class HistoryInStreetDto
    {
        public int Id { get; set; }
        public required string Period { get; set; }
        public string? Description { get; set; }
    }
}