using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Account
{
    public class AdminChangeUserDto
    {
        public string? Username { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? Role { get; set; }
    }
}