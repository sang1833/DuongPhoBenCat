using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.TrackRequest
{
    public class TrackRequestDto
    {
        [Required, Length(1, 20)]
        public required string Ip { get; set; }
        public DateTime AccessTime { get; set; }
        public string Hostname { get; set; } = "";
        public string City { get; set; } = "";
        public string Region { get; set; } = "";
        public string Country { get; set; } = "";
        public string Loc { get; set; } = "";
        public string Org { get; set; } = "";
        public string Postal { get; set; } = "";
        public string Timezone { get; set; } = "";
    }
}