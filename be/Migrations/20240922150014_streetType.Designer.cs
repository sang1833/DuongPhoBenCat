﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using be.Data;

#nullable disable

namespace be.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240922150014_streetType")]
    partial class streetType
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("be.Models.Street", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<LineString>("Route")
                        .HasColumnType("geometry");

                    b.Property<string>("StreetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StreetTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<LineString>("WayPoints")
                        .HasColumnType("geometry");

                    b.HasKey("Id");

                    b.HasIndex("StreetTypeId");

                    b.ToTable("Streets");
                });

            modelBuilder.Entity("be.Models.StreetHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("HistoryName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StreetId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("StreetId");

                    b.ToTable("StreetHistories");
                });

            modelBuilder.Entity("be.Models.StreetImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PublicId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StreetId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("StreetId");

                    b.ToTable("StreetImages");
                });

            modelBuilder.Entity("be.Models.StreetType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("StreetTypeName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("StreetTypes");
                });

            modelBuilder.Entity("be.Models.Street", b =>
                {
                    b.HasOne("be.Models.StreetType", "StreetType")
                        .WithMany("Streets")
                        .HasForeignKey("StreetTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StreetType");
                });

            modelBuilder.Entity("be.Models.StreetHistory", b =>
                {
                    b.HasOne("be.Models.Street", "Street")
                        .WithMany("Histories")
                        .HasForeignKey("StreetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Street");
                });

            modelBuilder.Entity("be.Models.StreetImage", b =>
                {
                    b.HasOne("be.Models.Street", "Street")
                        .WithMany("Images")
                        .HasForeignKey("StreetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Street");
                });

            modelBuilder.Entity("be.Models.Street", b =>
                {
                    b.Navigation("Histories");

                    b.Navigation("Images");
                });

            modelBuilder.Entity("be.Models.StreetType", b =>
                {
                    b.Navigation("Streets");
                });
#pragma warning restore 612, 618
        }
    }
}
