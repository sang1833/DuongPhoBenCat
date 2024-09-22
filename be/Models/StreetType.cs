using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    public class StreetType
    {
        [Key]
        public int Id { get; set; }
        public string StreetTypeName { get; set; } = "";
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Street>? Streets { get; set; }
    }
}