using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class AddStreetDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Streets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<LineString>(
                name: "ManualRoute",
                table: "Streets",
                type: "geometry",
                nullable: true);

            migrationBuilder.AddColumn<LineString>(
                name: "ManualWayPoints",
                table: "Streets",
                type: "geometry",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Opacity",
                table: "Streets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Streets",
                type: "integer",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2fc27e11-689d-4383-a7de-717cba5800cb", null, "SupAdmin", "SUPADMIN" },
                    { "67620963-0fc2-414e-b45f-e5c841cd3b41", null, "Director", "DIRECTOR" },
                    { "6cb37ea4-d779-44c1-8eb9-b41cb5e5e323", null, "Collab", "COLLAB" },
                    { "9f0ecd36-1843-4450-870f-d0c4c255d96d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2fc27e11-689d-4383-a7de-717cba5800cb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67620963-0fc2-414e-b45f-e5c841cd3b41");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6cb37ea4-d779-44c1-8eb9-b41cb5e5e323");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f0ecd36-1843-4450-870f-d0c4c255d96d");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Streets");

            migrationBuilder.DropColumn(
                name: "ManualRoute",
                table: "Streets");

            migrationBuilder.DropColumn(
                name: "ManualWayPoints",
                table: "Streets");

            migrationBuilder.DropColumn(
                name: "Opacity",
                table: "Streets");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Streets");

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
    }
}
