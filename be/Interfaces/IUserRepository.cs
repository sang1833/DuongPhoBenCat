using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.Account;
using be.Helpers;
using be.Models;

namespace be.Interfaces
{
    public interface IUserRepository
    {
        Task<(List<AdminGetUserDto> users, int totalPages)> GetAllUser(UserQueryObject userQueryObject);
        Task<AdminGetUserDto?> GetUserById(string id);
    }
}