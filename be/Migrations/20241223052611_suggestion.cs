using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class suggestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "LastAccess",
                table: "TrackRequests",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.CreateTable(
                name: "Suggestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suggestions", x => x.Id);
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Suggestions");

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

            migrationBuilder.DropColumn(
                name: "LastAccess",
                table: "TrackRequests");

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
    }
}
