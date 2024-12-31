using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Visitor
{
    public class VisitorDto
    {
        public required string VisitorId { get; set; }
        public int VisitCount { get; set; }  
        public DateTime FirstVisit { get; set; }
        public DateTime LastAccess { get; set; }
    }
}