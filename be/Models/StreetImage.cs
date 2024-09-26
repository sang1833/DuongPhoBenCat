using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Models
{
    public class StreetImage
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ImageUrl { get; set; } = "";
        [Required]
        public string PublicId { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? StreetId { get; set; }
        public Street? Street { get; set; }
    }
}