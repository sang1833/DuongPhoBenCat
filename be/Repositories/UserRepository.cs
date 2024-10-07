using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Data;
using be.Dtos.Account;
using be.Helpers;
using be.Interfaces;
using be.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace be.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;

        public UserRepository(UserManager<AppUser> userManager)
        {
            _userManager = userManager; 
        }

        public async Task<(List<AdminGetUserDto> users, int totalPages)> GetAllUser(UserQueryObject userQueryObject)
        {
            var users = _userManager.Users.AsQueryable();
            List<AdminGetUserDto> adminGetUserDtos = new List<AdminGetUserDto>();

            if (!string.IsNullOrWhiteSpace(userQueryObject.UserName))
            {
                users = users.Where(u => (u.UserName ?? "").ToLower().Contains(userQueryObject.UserName.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(userQueryObject.Role))
            {
                var usersInRole = await _userManager.GetUsersInRoleAsync(userQueryObject.Role);
                users = users.Where(u => usersInRole.Contains(u));
            }

            if (!string.IsNullOrWhiteSpace(userQueryObject.SortBy))
            {
                users = userQueryObject.SortBy.ToLower() switch
                {
                    "username" => userQueryObject.IsDescending ? users.OrderByDescending(u => u.UserName) : users.OrderBy(u => u.UserName),
                    "email" => userQueryObject.IsDescending ? users.OrderByDescending(u => u.Email) : users.OrderBy(u => u.Email),
                    "createddate" => userQueryObject.IsDescending ? users.OrderByDescending(u => u.CreatedDate) : users.OrderBy(u => u.CreatedDate),
                    "updateddate" => userQueryObject.IsDescending ? users.OrderByDescending(u => u.UpdatedDate) : users.OrderBy(u => u.UpdatedDate),
                    _ => users.OrderBy(u => u.UserName)
                };
            }

            int totalCount = await users.CountAsync();  
            int totalPages = (int)Math.Ceiling((double)totalCount / userQueryObject.PageSize);

            int skipNumber = (userQueryObject.PageNumber - 1) * userQueryObject.PageSize;
            var pagedUsers = await users.Skip(skipNumber).Take(userQueryObject.PageSize).ToListAsync();

            // Fetch roles for each user
            foreach (var user in pagedUsers)
            {
                var roles = await _userManager.GetRolesAsync(user);

                adminGetUserDtos.Add(new AdminGetUserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = roles.ToList(),
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate
                });
            }

            return (adminGetUserDtos, totalPages);
        }

        public async Task<AdminGetUserDto?> GetUserById(string id)
        {   
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);
            return new AdminGetUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Roles = roles.ToList(),
                CreatedDate = user.CreatedDate,
                UpdatedDate = user.UpdatedDate
            };
        }
    }
}