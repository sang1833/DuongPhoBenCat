using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Helpers
{
    public class UserQueryObject : QueryObject
    {
        public string? UserName { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
    }
}