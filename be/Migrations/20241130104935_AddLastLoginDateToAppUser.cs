using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class AddLastLoginDateToAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "482ed605-9e21-4e47-baf7-13237d90e333");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6eeb43e8-95a7-47e5-bc65-110d9e47e05d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af2ec6c5-bf80-4812-97f1-6a6831d99431");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cc198859-3cde-41a2-96b2-58d8b7bd320f");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActive",
                table: "AspNetUsers",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9d0d1b9e-80da-4946-bf14-aeae66341ffb", null, "Admin", "ADMIN" },
                    { "cafaef37-cf33-43e6-a40a-4ef72cb7cb62", null, "Collab", "COLLAB" },
                    { "f2cea9cb-fbc4-427a-8180-2900c0737967", null, "SupAdmin", "SUPADMIN" },
                    { "f6c2eb6e-d873-46c1-96de-d4075562fb50", null, "Director", "DIRECTOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9d0d1b9e-80da-4946-bf14-aeae66341ffb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cafaef37-cf33-43e6-a40a-4ef72cb7cb62");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f2cea9cb-fbc4-427a-8180-2900c0737967");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6c2eb6e-d873-46c1-96de-d4075562fb50");

            migrationBuilder.DropColumn(
                name: "LastActive",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "482ed605-9e21-4e47-baf7-13237d90e333", null, "Director", "DIRECTOR" },
                    { "6eeb43e8-95a7-47e5-bc65-110d9e47e05d", null, "Collab", "COLLAB" },
                    { "af2ec6c5-bf80-4812-97f1-6a6831d99431", null, "SupAdmin", "SUPADMIN" },
                    { "cc198859-3cde-41a2-96b2-58d8b7bd320f", null, "Admin", "ADMIN" }
                });
        }
    }
}
