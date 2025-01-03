using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Helpers;
using be.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace be.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<AppUser>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
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

            builder.Entity<Visitor>()
                .HasMany(s => s.VisitorDetails)
                .WithOne(si => si.Visitor)
                .HasForeignKey(si => si.VisitorId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<StreetHistory>()
                .Property(sh => sh.CreatedDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("now()");
        
            builder.Entity<StreetHistory>()
                .Property(sh => sh.UpdatedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("now()");
        
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole {Name = "SupAdmin", NormalizedName = "SUPADMIN"},
                new IdentityRole {Name = "Admin", NormalizedName = "ADMIN"},
                new IdentityRole {Name = "Collab", NormalizedName = "COLLAB"},
                new IdentityRole {Name = "Director", NormalizedName = "DIRECTOR"}
            };

            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<StreetType>()
                .Property(s => s.CreatedDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("now()");
            
            builder.Entity<StreetType>()
                .Property(s => s.UpdatedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("now()");
            
            builder.Entity<StreetType>().HasData(
                new StreetType {Id = 1, StreetTypeName = "Đường lớn"},
                new StreetType {Id = 2, StreetTypeName = "Đường nhỏ"},
                new StreetType {Id = 3, StreetTypeName = "Hẻm"}
            );
            
            builder.Entity<AppUser>()
                .Property(s => s.CreatedDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("now()");
            
            builder.Entity<AppUser>()
                .Property(s => s.UpdatedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("now()");

            builder.Entity<Suggestion>()
                .Property(tr => tr.CreatedDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("now()");

            builder.Entity<VisitorDetail>()
                .Property(tr => tr.AccessTime)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("now()");
        }

        public required DbSet<Street> Streets { get; set; }
        public required DbSet<StreetType> StreetTypes { get; set; }
        public required DbSet<StreetHistory> StreetHistories { get; set; }
        public required DbSet<StreetImage> StreetImages { get; set; }
        public required DbSet<Visitor> Visitors { get; set; }
        public required DbSet<VisitorDetail> VisitorDetails { get; set; }
        public required DbSet<Suggestion> Suggestions { get; set; }
    }
}