using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    // Geolocation, get from https://ipinfo.io/
    public class TrackRequest
    {
        [Key]
        public required string Ip { get; set; }
        public required string Hostname { get; set; }
        public required string City { get; set; }
        public required string Region { get; set; }
        public required string Country { get; set; }
        public required string Loc { get; set; }
        public required string Org { get; set; }
        public required string Postal { get; set; }
        public required string Timezone { get; set; }
        public int AccessNumber { get; set; }
    }
}