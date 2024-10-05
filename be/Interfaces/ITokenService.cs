using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Models;

namespace be.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user, IList<string> roles);
        string CreateRefreshToken();
        string? GetUsernameFromToken(string token);
    }
}