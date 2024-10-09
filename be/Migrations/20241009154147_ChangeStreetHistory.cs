using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class ChangeStreetHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "10c5a115-b8aa-4135-b95e-53f0f5ca0f89");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "115917f1-b7d9-4821-9d54-0a7563e5e4aa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23369e29-1cc3-4de1-bee8-4815d99ed692");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e01c9e67-7619-42c1-be5c-4c78b3fdeb45");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "StreetHistories");

            migrationBuilder.RenameColumn(
                name: "HistoryName",
                table: "StreetHistories",
                newName: "Period");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                table: "StreetHistories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "StreetHistories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValueSql: "now()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "StreetHistories",
                type: "text",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Description",
                table: "StreetHistories");

            migrationBuilder.RenameColumn(
                name: "Period",
                table: "StreetHistories",
                newName: "HistoryName");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                table: "StreetHistories",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValueSql: "now()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "StreetHistories",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValueSql: "now()");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "StreetHistories",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "10c5a115-b8aa-4135-b95e-53f0f5ca0f89", null, "Director", "DIRECTOR" },
                    { "115917f1-b7d9-4821-9d54-0a7563e5e4aa", null, "SupAdmin", "SUPADMIN" },
                    { "23369e29-1cc3-4de1-bee8-4815d99ed692", null, "Admin", "ADMIN" },
                    { "e01c9e67-7619-42c1-be5c-4c78b3fdeb45", null, "Collab", "COLLAB" }
                });
        }
    }
}
