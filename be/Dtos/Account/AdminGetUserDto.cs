using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Account
{
    public class AdminGetUserDto
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public required List<string> Roles { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}