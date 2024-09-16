using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    public class StreetHistory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string HistoryName { get; set; } = "";
        [DataType(DataType.MultilineText)]
        public string? Content { get; set; } = "";
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        [Required]
        public int StreetId { get; set; }
        public Street? Street { get; set; }
    }
}