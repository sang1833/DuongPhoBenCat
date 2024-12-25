using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class Visitor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackRequests");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "523a4b0c-cd1b-4c01-bb3b-bf3c99843f45");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "92c85005-0833-4373-a48a-dbbc55ab9700");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "afff7437-470b-473a-8aeb-24dac943f820");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c290dd23-2610-40e4-ab30-05beb4363abd");

            migrationBuilder.CreateTable(
                name: "Visitors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VisitorId = table.Column<string>(type: "text", nullable: false),
                    VisitCount = table.Column<int>(type: "integer", nullable: false),
                    FirstVisit = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "now()"),
                    LastAccess = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visitors", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ffecd3f-48f1-4cb8-ac6f-e9216d836f1f", null, "Collab", "COLLAB" },
                    { "4bdaa725-c811-44ab-ab34-74d1a4efb97d", null, "Director", "DIRECTOR" },
                    { "5df27e6e-c630-4aef-af10-53f42e001a58", null, "Admin", "ADMIN" },
                    { "bc990c09-6a23-4e38-9468-e29c9457c895", null, "SupAdmin", "SUPADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Visitors");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ffecd3f-48f1-4cb8-ac6f-e9216d836f1f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4bdaa725-c811-44ab-ab34-74d1a4efb97d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5df27e6e-c630-4aef-af10-53f42e001a58");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc990c09-6a23-4e38-9468-e29c9457c895");

            migrationBuilder.CreateTable(
                name: "TrackRequests",
                columns: table => new
                {
                    Ip = table.Column<string>(type: "text", nullable: false),
                    AccessNumber = table.Column<int>(type: "integer", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Hostname = table.Column<string>(type: "text", nullable: false),
                    LastAccess = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "now()"),
                    Loc = table.Column<string>(type: "text", nullable: false),
                    Org = table.Column<string>(type: "text", nullable: false),
                    Postal = table.Column<string>(type: "text", nullable: false),
                    Region = table.Column<string>(type: "text", nullable: false),
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
                    { "523a4b0c-cd1b-4c01-bb3b-bf3c99843f45", null, "Collab", "COLLAB" },
                    { "92c85005-0833-4373-a48a-dbbc55ab9700", null, "Director", "DIRECTOR" },
                    { "afff7437-470b-473a-8aeb-24dac943f820", null, "Admin", "ADMIN" },
                    { "c290dd23-2610-40e4-ab30-05beb4363abd", null, "SupAdmin", "SUPADMIN" }
                });
        }
    }
}
