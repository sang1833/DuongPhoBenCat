using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e7be8ab-0997-4d22-b662-6450f915c2cc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "527c755c-9563-417a-aa48-79ef14ec20cd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7b1cf6d4-8c84-4d97-89f7-c58f63749937");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7fe6f864-03b4-485e-befb-d2adf0642155");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "AspNetUsers",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "AspNetUsers",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1db4a71c-adaf-4ba9-b666-f1605dc10e4b", null, "Director", "DIRECTOR" },
                    { "4604fcda-4854-4de2-ad70-475a76e0e48b", null, "Collab", "COLLAB" },
                    { "59354e49-7157-4c94-96b6-27a7e2c0dc6d", null, "Admin", "ADMIN" },
                    { "96373894-7442-4e3d-8dc1-f0121a7ca602", null, "SupAdmin", "SUPADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1db4a71c-adaf-4ba9-b666-f1605dc10e4b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4604fcda-4854-4de2-ad70-475a76e0e48b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59354e49-7157-4c94-96b6-27a7e2c0dc6d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96373894-7442-4e3d-8dc1-f0121a7ca602");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1e7be8ab-0997-4d22-b662-6450f915c2cc", null, "Director", "DIRECTOR" },
                    { "527c755c-9563-417a-aa48-79ef14ec20cd", null, "SupAdmin", "SUPADMIN" },
                    { "7b1cf6d4-8c84-4d97-89f7-c58f63749937", null, "Admin", "ADMIN" },
                    { "7fe6f864-03b4-485e-befb-d2adf0642155", null, "Collab", "COLLAB" }
                });
        }
    }
}
