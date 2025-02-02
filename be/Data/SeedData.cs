using be.Helpers;
using be.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

public static class SeedData
{
    public static async Task Initialize(UserManager<AppUser> userManager)
    {
        // Create a super admin user if it doesn't exist
        var superAdmin = await userManager.FindByEmailAsync(EnvManager.GetEnv("SA_MAIL"));
        if (superAdmin == null)
        {
            var user = new AppUser
            {
                UserName = EnvManager.GetEnv("SA_NAME"),
                Email = EnvManager.GetEnv("SA_MAIL"),
                EmailConfirmed = true,
            };
            var createPowerUser = await userManager.CreateAsync(user, EnvManager.GetEnv("SA_PW"));
            if (createPowerUser.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "SupAdmin");
            }
        }
        else
        {
            // Ensure the user is in the SupAdmin role
            if (!await userManager.IsInRoleAsync(superAdmin, "SupAdmin"))
            {
                await userManager.AddToRoleAsync(superAdmin, "SupAdmin");
            }
        }
    }
}