using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class trackUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "236adb65-ffc6-4093-bfc4-216aa655bd52");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8e3e7a89-1117-4627-b7bc-4a71b0337e7d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ac9fe35-86a0-45a9-8fb5-e791fcb83d57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e9425382-4eda-4e99-b7c3-f4ba19548882");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0cf2590e-d38a-4ab8-916b-6ea98b87e74d", null, "Collab", "COLLAB" },
                    { "327de058-ca0d-4334-925c-c128ccd30566", null, "SupAdmin", "SUPADMIN" },
                    { "7d041389-f0c2-4c0c-b878-31508473f5da", null, "Director", "DIRECTOR" },
                    { "e47cb28a-1259-4c2a-aff9-e13bed7c0c9c", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0cf2590e-d38a-4ab8-916b-6ea98b87e74d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "327de058-ca0d-4334-925c-c128ccd30566");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7d041389-f0c2-4c0c-b878-31508473f5da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e47cb28a-1259-4c2a-aff9-e13bed7c0c9c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "236adb65-ffc6-4093-bfc4-216aa655bd52", null, "Director", "DIRECTOR" },
                    { "8e3e7a89-1117-4627-b7bc-4a71b0337e7d", null, "Collab", "COLLAB" },
                    { "9ac9fe35-86a0-45a9-8fb5-e791fcb83d57", null, "SupAdmin", "SUPADMIN" },
                    { "e9425382-4eda-4e99-b7c3-f4ba19548882", null, "Admin", "ADMIN" }
                });
        }
    }
}
