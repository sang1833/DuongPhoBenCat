using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using be.Dtos.Account;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace be.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IUserRepository _userRepository;
        private readonly DateTimeOffset rtExpireTime = DateTime.UtcNow.AddDays(
            int.Parse(
                Environment.GetEnvironmentVariable("REFRESH_TOKEN_EXPIRES_IN") 
                ?? throw new InvalidOperationException("Jwt expiration minutes is not set in environment variables.")
            )
        );

        public AuthController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IUserRepository userRepository)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto){
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);

                AppUser? appUser = await _userManager.FindByNameAsync(loginDto.Username);

                if(appUser == null)
                    return Unauthorized("Dont have account");
                
                SignInResult result = await _signInManager.CheckPasswordSignInAsync(appUser, loginDto.Password, false);

                if(!result.Succeeded)
                    return Unauthorized("Invalid username or password");

                // Update the LastLoginDate
                appUser.LastActive = DateTime.UtcNow;
                await _userManager.UpdateAsync(appUser);

                IList<string> roles = await _userManager.GetRolesAsync(appUser);

                string accessToken = _tokenService.CreateToken(appUser, roles);
                string refreshToken = _tokenService.CreateRefreshToken();

                return Ok(
                    new NewUserDto {
                        Username = appUser.UserName,
                        Email = appUser.Email,
                        Role = roles.Count > 0 ? roles[0] : "NoRole",
                        Token = accessToken,
                        RefreshToken = refreshToken
                    }
                );
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("adminRegister/{role}"), Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> Register([FromRoute] string role, [FromBody]RegisterDto registerDto)
        {
            try {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                AppUser appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                if(await _userManager.FindByNameAsync(registerDto.Username) != null)
                    return BadRequest(new { message = "Tên đăng nhập đã tồn tại" });

                if(await _userManager.FindByEmailAsync(registerDto.Email) != null)
                    return BadRequest(new { message = "Email đã tồn tại" });

                IdentityResult createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!createdUser.Succeeded)
                {
                    return BadRequest(createdUser.Errors);
                }

                IdentityResult roleResult = await _userManager.AddToRoleAsync(appUser, role);
                if(roleResult.Succeeded){
                    return Ok(
                        new NewUserDto {
                            Username = appUser.UserName,
                            Email = appUser.Email
                        }
                    ); 
                } else {
                    return StatusCode(500, roleResult.Errors);
                }
            } catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                return Ok("Logout success");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto tokenRequest)
        {
            if (tokenRequest.RefreshToken == null)
            {
                return Unauthorized(new { message = "No refresh token found" });
            }
            string? username;
            if (tokenRequest.Token == null)
            {
                return BadRequest(new { message = "No token found" });
            } else {
                username = _tokenService.GetUsernameFromToken(tokenRequest.Token);
                if (username == null)
                {
                    return BadRequest(new { message = "No username found" });
                }
            }

            AppUser? appUser = await _userManager.FindByNameAsync(username);

            if(appUser == null)
                return BadRequest("Dont have account");

            appUser.LastActive = DateTime.UtcNow;
            await _userManager.UpdateAsync(appUser);

            IList<string> roles = await _userManager.GetRolesAsync(appUser);

            var newAccessToken = _tokenService.CreateToken(appUser, roles);

            return Ok(new { message = "Token refreshed successfully", user = new NewUserDto {
                Username = appUser.UserName,
                Email = appUser.Email,
                Role = roles.Count > 0 ? roles[0] : "NoRole",
                Token = newAccessToken,
                RefreshToken = tokenRequest.RefreshToken
            } });
        }

        [HttpPut("changePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            string? username;
            if (changePasswordDto.Token == null)
            {
                return Unauthorized(new { message = "Thông tin khách hàng không hợp lệ" });
            } else {
                username = _tokenService.GetUsernameFromToken(changePasswordDto.Token);
                if (username == null)
                {
                    return Unauthorized(new { message = "No username found" });
                }
            }

            AppUser? appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return Unauthorized("User not found");
            }

            var result = await _userManager.ChangePasswordAsync(appUser, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Mật khẩu cũ không đúng" });
            }

            return Ok(new { message = "Đổi mật khẩu thành công" });
        }

        [HttpGet("getAllUser")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> GetAllUser([FromQuery] UserQueryObject userQueryObject)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<AdminGetUserDto> userDtos, int TotalPages) = await _userRepository.GetAllUser(userQueryObject);

            return Ok(new { Users = userDtos, TotalPages = TotalPages });
        }

        [HttpGet("getUserById/{id}")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> GetUserById([FromRoute] string id)
        {
            AdminGetUserDto? userDto = await _userRepository.GetUserById(id);
            if (userDto == null)
            {
                return NotFound("User not found");
            }
            return Ok(userDto);
        }
        
        [HttpPut("adminChangeUser/{userId}")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> AdminChangeUser([FromRoute] string userId, [FromBody] AdminChangeUserDto adminChangeUserDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(adminChangeUserDto.Username == null && adminChangeUserDto.Email == null && adminChangeUserDto.Role == null)
                return BadRequest(new { message = "Dữ liệu đầu vào trống" });

            AppUser? appUser = await _userManager.FindByIdAsync(userId);
            if (appUser == null)
            {
                return NotFound(new { message = "Không tìm thấy người dùng" });
            }

            if (adminChangeUserDto.Email != null)
            {
                if(await _userManager.FindByEmailAsync(adminChangeUserDto.Email) != null && adminChangeUserDto.Email != appUser.Email)
                    return BadRequest(new { message = "Email đã tồn tại" });

                var setEmailResult = await _userManager.SetEmailAsync(appUser, adminChangeUserDto.Email);
                if (!setEmailResult.Succeeded)
                {
                    return BadRequest(setEmailResult.Errors);
                }
            }

            if (adminChangeUserDto.Username != null)
            {
                if(await _userManager.FindByNameAsync(adminChangeUserDto.Username) != null && adminChangeUserDto.Username != appUser.UserName)
                    return BadRequest(new { message = "Tên đăng nhập đã tồn tại" });

                var setUserNameResult = await _userManager.SetUserNameAsync(appUser, adminChangeUserDto.Username);
                if (!setUserNameResult.Succeeded)
                {
                    return BadRequest(setUserNameResult.Errors);
                }
            }

            if (adminChangeUserDto.Role != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(appUser);
                var removeRolesResult = await _userManager.RemoveFromRolesAsync(appUser, currentRoles);
                if (!removeRolesResult.Succeeded)
                {
                    return BadRequest(removeRolesResult.Errors);
                }

                var addRoleResult = await _userManager.AddToRoleAsync(appUser, adminChangeUserDto.Role);
                if (!addRoleResult.Succeeded)
                {
                    return BadRequest(addRoleResult.Errors);
                }
            }

            return Ok(new { message = "Cập nhật người dùng thành công" });
        }

        [HttpPut("adminChangeUserPassword/{userId}")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> AdminChangeUserPassword([FromRoute] string userId, [FromBody] string password)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            AppUser? appUser = await _userManager.FindByIdAsync(userId);
            if (appUser == null)
            {
                return NotFound(new { message = "Không tìm thấy người dùng" });
            }

            var removePasswordResult = await _userManager.RemovePasswordAsync(appUser);
            if (!removePasswordResult.Succeeded)
            {
                return BadRequest(removePasswordResult.Errors);
            }

            var addPasswordResult = await _userManager.AddPasswordAsync(appUser, password);
            if (!addPasswordResult.Succeeded)
            {
                return BadRequest(addPasswordResult.Errors);
            }

            return Ok(new { message = "Cập nhật mật khẩu người dùng thành công" });
        }

        [HttpDelete("deleteUser/{userId}")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            AppUser? appUser = await _userManager.FindByIdAsync(userId);
            if (appUser == null)
            {
                return NotFound("User not found");
            }

            IdentityResult deleteResult = await _userManager.DeleteAsync(appUser);
            if (!deleteResult.Succeeded)
            {
                return BadRequest(deleteResult.Errors);
            }

            return Ok("User deleted successfully");
        }
    }
}