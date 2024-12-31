using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    public class VisitorDetail
    {
        [Key]
        public int Id { get; set; }
        public DateTime AccessTime { get; set; }
        public string VisitorId { get; set; } = "";
        public Visitor? Visitor { get; set; }
    }
}