using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    // Geolocation, get from https://ipinfo.io/
    public class Visitor
    {
        [Key]
        public int Id { get; set; }
        public string VisitorId { get; set; } = "";
        public int VisitCount { get; set; }
        public DateTime FirstVisit { get; set; }
        public DateTime LastAccess { get; set; }
    }
}