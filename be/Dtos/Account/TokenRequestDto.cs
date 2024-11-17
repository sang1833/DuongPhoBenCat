using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Account
{
    public class TokenRequestDto
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
        
    }
}