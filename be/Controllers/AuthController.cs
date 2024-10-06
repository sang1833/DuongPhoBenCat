using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using be.Dtos.Account;
using be.Interfaces;
using be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly DateTimeOffset rtExpireTime = DateTime.UtcNow.AddDays(
            int.Parse(
                Environment.GetEnvironmentVariable("REFRESH_TOKEN_EXPIRES_IN") 
                ?? throw new InvalidOperationException("Jwt expiration minutes is not set in environment variables.")
            )
        );

        public AuthController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
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

                IList<string> roles = await _userManager.GetRolesAsync(appUser);

                string accessToken = _tokenService.CreateToken(appUser, roles);
                string refreshToken = _tokenService.CreateRefreshToken();

                CookieOptions cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = true,
                    Expires = rtExpireTime
                };
                Response.Cookies.Append("auth", accessToken, cookieOptions);

                // Set Refresh Token as HttpOnly cookie
                Response.Cookies.Append("_re", refreshToken, cookieOptions);

                Response.Cookies.Append("isLogin", rtExpireTime.ToString(), new CookieOptions
                {
                    HttpOnly = false,
                    SameSite = SameSiteMode.Strict,
                    Secure = true,
                    Expires = rtExpireTime
                });
                return Ok(
                    new NewUserDto {
                        Username = appUser.UserName,
                        Email = appUser.Email,
                        Role = roles.Count > 0 ? roles[0] : "NoRole"
                    }
                );
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // [HttpPost("adminRegister/{userType}"), Authorize(Roles = "SupAdmin")]
        [HttpPost("adminRegister/{userType}")]
        public async Task<IActionResult> Register([FromRoute] string userType, [FromBody]RegisterDto registerDto)
        {
            try {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                AppUser appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };
                
                IdentityResult createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!createdUser.Succeeded)
                {
                    return BadRequest(createdUser.Errors);
                }

                IdentityResult roleResult = await _userManager.AddToRoleAsync(appUser, userType);
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
                Response.Cookies.Delete("auth");
                Response.Cookies.Delete("_re");
                return Ok("Logout success");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            string? refreshToken = Request.Cookies["_re"];
            if (refreshToken == null)
            {
                return Unauthorized(new { message = "No refresh token found" });
            }
            string? token = Request.Cookies["auth"];
            string? username;
            if (token == null)
            {
                return Unauthorized(new { message = "No token found" });
            } else {
                username = _tokenService.GetUsernameFromToken(token);
                if (username == null)
                {
                    return Unauthorized(new { message = "No username found" });
                }
            }

            AppUser? appUser = await _userManager.FindByNameAsync(username);

            if(appUser == null)
                return Unauthorized("Dont have account");

            IList<string> roles = await _userManager.GetRolesAsync(appUser);

            Response.Cookies.Delete("auth");

            var newAccessToken = _tokenService.CreateToken(appUser, roles);

            // Set new Access Token in cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = rtExpireTime
            };
            Response.Cookies.Append("auth", newAccessToken, cookieOptions);

            return Ok(new { message = "Token refreshed successfully", token = newAccessToken });
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            string? token = Request.Cookies["auth"];
            string? username;
            if (token == null)
            {
                return Unauthorized(new { message = "No token found" });
            } else {
                username = _tokenService.GetUsernameFromToken(token);
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
                return BadRequest(result.Errors);
            }

            return Ok("Password changed successfully");
        }
        
        [HttpPut("adminChangeUser/{userName}")]
        [Authorize(Roles = "SupAdmin")]
        public async Task<IActionResult> AdminChangeUser([FromRoute] string userName, [FromBody] RegisterDto registerDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            AppUser? appUser = await _userManager.FindByNameAsync(userName);
            if (appUser == null)
            {
                return Unauthorized("User not found");
            }

            var setEmailResult = await _userManager.SetEmailAsync(appUser, registerDto.Email);
            if (!setEmailResult.Succeeded)
            {
                return BadRequest(setEmailResult.Errors);
            }

            var setUserNameResult = await _userManager.SetUserNameAsync(appUser, registerDto.Username);
            if (!setUserNameResult.Succeeded)
            {
                return BadRequest(setUserNameResult.Errors);
            }

            var removePasswordResult = await _userManager.RemovePasswordAsync(appUser);
            if (!removePasswordResult.Succeeded)
            {
                return BadRequest(removePasswordResult.Errors);
            }

            var addPasswordResult = await _userManager.AddPasswordAsync(appUser, registerDto.Password);
            if (!addPasswordResult.Succeeded)
            {
                return BadRequest(addPasswordResult.Errors);
            }

            return Ok("Password changed successfully");
        }
    }
}