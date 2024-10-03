using System.Reflection;
using System.Security.Claims;
using System.Text;
using be.Data;
using be.Helpers;
using be.Interfaces;
using be.Models;
using be.Repositories;
using be.Services;
using CloudinaryDotNet;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Npgsql;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));

// Initialize Cloudinary
var cloudinaryUrl = Environment.GetEnvironmentVariable("CLOUDINARY_URL");
if (string.IsNullOrEmpty(cloudinaryUrl))
{
    throw new InvalidOperationException("Cloudinary URL is not set in environment variables.");
}

Cloudinary cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
cloudinary.Api.Secure = true;


var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
dataSourceBuilder.UseNetTopologySuite();
var dataSource = dataSourceBuilder.Build();

// Add services to the container.
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Bản đồ Bến Cát", Version = "v1" });

    // c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    // {
    //     In = ParameterLocation.Header,
    //     Name = "Authorization",
    //     Type = SecuritySchemeType.ApiKey,
    //     Scheme = "Bearer",
    //     BearerFormat = "JWT",
    //     Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
    // });

    // c.AddSecurityRequirement(new OpenApiSecurityRequirement
    // {
    //     {
    //         new OpenApiSecurityScheme
    //         {
    //             Reference = new OpenApiReference
    //             {
    //                 Id = "Bearer",
    //                 Type = ReferenceType.SecurityScheme,
    //             },
    //         },
    //         new string[] { }
    //     }
    // });
    
    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
        ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                Environment.GetEnvironmentVariable("JWT_SECRET") 
                ?? throw new InvalidOperationException("Jwt secret is not set in environment variables.")
                )
        ),
    };

    // Read the token from the cookie
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = (context) =>
        {
            context.Token = context.Request.Cookies["auth"];
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("BePolicy", builder =>
    {
        builder.WithOrigins(
            Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS")
            ?.Split(",")
            ?? throw new InvalidOperationException("CORS_ALLOWED_ORIGINS is not set in environment variables.")
        )
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});
builder.Services.AddControllers().AddNewtonsoftJson(options => 
{
   options.SerializerSettings.Converters.Add(new LineStringConverter());
});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(dataSource, o => o.UseNetTopologySuite()
));

builder.Services.AddSingleton(cloudinary);

builder.Services.AddScoped<IStreetRepository, StreetRepository>();
builder.Services.AddScoped<IStreetHistoryRepository, StreetHistoryRepository>();
builder.Services.AddScoped<IStreetImageRepository, StreetImageRepository>();
builder.Services.AddScoped<IStreetTypeRepository, StreetTypeRepository>();
builder.Services.AddScoped<IImageUploadService, ImageUploadService>();
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("BePolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        await context.Database.MigrateAsync();
        await SeedData.Initialize(services, userManager);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

app.Run();

