using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Helpers
{
    public class TrackRequestQueryObject : QueryObject
    {
        public string? Ip { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
    }
}