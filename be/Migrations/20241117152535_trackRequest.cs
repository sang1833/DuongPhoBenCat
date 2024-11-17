using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class trackRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "TrackRequests",
                columns: table => new
                {
                    Ip = table.Column<string>(type: "text", nullable: false),
                    Hostname = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Loc = table.Column<string>(type: "text", nullable: false),
                    Org = table.Column<string>(type: "text", nullable: false),
                    Postal = table.Column<string>(type: "text", nullable: false),
                    Timezone = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackRequests", x => x.Ip);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackRequests");

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
    }
}
