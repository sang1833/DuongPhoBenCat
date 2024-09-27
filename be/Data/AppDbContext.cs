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

            builder.Entity<Street>()
                .Property(s => s.CreatedDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("now()");
            
            builder.Entity<Street>()
                .Property(s => s.UpdatedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("now()");

            builder.Entity<Street>()
                .HasOne(s => s.StreetType)
                .WithMany(sh => sh.Streets)
                .HasForeignKey(sh => sh.StreetTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Street>()
                .HasMany(s => s.Histories)
                .WithOne(sh => sh.Street)
                .HasForeignKey(sh => sh.StreetId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Street>()
                .HasMany(s => s.Images)
                .WithOne(si => si.Street)
                .HasForeignKey(si => si.StreetId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Street> Streets { get; set; }
        public DbSet<StreetType> StreetTypes { get; set; }
        public DbSet<StreetHistory> StreetHistories { get; set; }
        public DbSet<StreetImage> StreetImages { get; set; }
    }
}