using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Helpers
{
    public class StreetQueryObject : QueryObject
    {
        public string? StreetName { get; set; } = string.Empty;
        public string? StreetType { get; set; } = string.Empty;
    }
}