// filepath: /e:/Code/Year_51/ThucTap/DuongPhoBenCat/be/Middleware/TokenMiddleware.cs
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

public class TokenMiddleware
{
    private readonly RequestDelegate _next;

    public TokenMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Headers.ContainsKey("Authorization"))
        {
            var authHeader = context.Request.Headers["Authorization"].ToString();
            if (authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring(7); // Remove "Bearer " prefix
                context.Items["AuthorizationToken"] = token;
            }
        }

        await _next(context);
    }
}