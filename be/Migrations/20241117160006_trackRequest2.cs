using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class trackRequest2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2ac50cf8-b359-4552-a093-ec4fbb11e673");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "83e17f0c-efd2-407a-a343-66f678f091af");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ab78e95b-1e77-42df-827d-ec1bcaa51bfe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "edc3616b-6229-49a9-8abb-66ed867cb5d7");

            migrationBuilder.AddColumn<int>(
                name: "AccessNumber",
                table: "TrackRequests",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "AccessNumber",
                table: "TrackRequests");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2ac50cf8-b359-4552-a093-ec4fbb11e673", null, "SupAdmin", "SUPADMIN" },
                    { "83e17f0c-efd2-407a-a343-66f678f091af", null, "Collab", "COLLAB" },
                    { "ab78e95b-1e77-42df-827d-ec1bcaa51bfe", null, "Director", "DIRECTOR" },
                    { "edc3616b-6229-49a9-8abb-66ed867cb5d7", null, "Admin", "ADMIN" }
                });
        }
    }
}
