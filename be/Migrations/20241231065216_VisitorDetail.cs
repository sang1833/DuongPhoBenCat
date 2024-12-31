using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class VisitorDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Visitors",
                table: "Visitors");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d6f547a-b4d3-4f4a-9f27-691c8b0e39bd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "607a245e-2b97-4a7c-8990-a9cf4555f826");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94e18170-1229-42c5-bca7-39b7f15dc554");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9840def-59e2-482b-969e-5deaa7abd992");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Visitors");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FirstVisit",
                table: "Visitors",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValueSql: "now()");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Visitors",
                table: "Visitors",
                column: "VisitorId");

            migrationBuilder.CreateTable(
                name: "VisitorDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccessTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "now()"),
                    VisitorId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitorDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VisitorDetails_Visitors_VisitorId",
                        column: x => x.VisitorId,
                        principalTable: "Visitors",
                        principalColumn: "VisitorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17444096-3f33-4361-9d17-f533ff83a1b6", null, "Collab", "COLLAB" },
                    { "74a5935b-4c31-42ca-a880-c48ab8be5cc8", null, "Director", "DIRECTOR" },
                    { "b042b7b9-3cd6-4912-9379-14e237810ae2", null, "SupAdmin", "SUPADMIN" },
                    { "d04a8ffa-2445-4a12-b209-4a3adc833760", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_VisitorDetails_VisitorId",
                table: "VisitorDetails",
                column: "VisitorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitorDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Visitors",
                table: "Visitors");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17444096-3f33-4361-9d17-f533ff83a1b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "74a5935b-4c31-42ca-a880-c48ab8be5cc8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b042b7b9-3cd6-4912-9379-14e237810ae2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d04a8ffa-2445-4a12-b209-4a3adc833760");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FirstVisit",
                table: "Visitors",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Visitors",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Visitors",
                table: "Visitors",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5d6f547a-b4d3-4f4a-9f27-691c8b0e39bd", null, "Collab", "COLLAB" },
                    { "607a245e-2b97-4a7c-8990-a9cf4555f826", null, "Director", "DIRECTOR" },
                    { "94e18170-1229-42c5-bca7-39b7f15dc554", null, "Admin", "ADMIN" },
                    { "a9840def-59e2-482b-969e-5deaa7abd992", null, "SupAdmin", "SUPADMIN" }
                });
        }
    }
}
