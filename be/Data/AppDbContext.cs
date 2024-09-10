using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Models;
using Microsoft.EntityFrameworkCore;

namespace be.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasPostgresExtension("postgis");
        }

        public DbSet<Street> Streets { get; set; }
    }
}