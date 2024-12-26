using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class removeSomeStreetInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "413c40b3-8524-4e60-8c49-52dc481920d2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7557beb9-8a4f-4636-b71e-ab9ab8c4fb9a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbb16b5f-acc1-49f4-b33c-132f1615dc5d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdca1225-bcb1-439a-a40a-045dae654645");

            migrationBuilder.DropColumn(
                name: "Color",
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
                    { "5d6f547a-b4d3-4f4a-9f27-691c8b0e39bd", null, "Collab", "COLLAB" },
                    { "607a245e-2b97-4a7c-8990-a9cf4555f826", null, "Director", "DIRECTOR" },
                    { "94e18170-1229-42c5-bca7-39b7f15dc554", null, "Admin", "ADMIN" },
                    { "a9840def-59e2-482b-969e-5deaa7abd992", null, "SupAdmin", "SUPADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Streets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Opacity",
                table: "Streets",
                type: "double precision",
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
                    { "413c40b3-8524-4e60-8c49-52dc481920d2", null, "Admin", "ADMIN" },
                    { "7557beb9-8a4f-4636-b71e-ab9ab8c4fb9a", null, "SupAdmin", "SUPADMIN" },
                    { "dbb16b5f-acc1-49f4-b33c-132f1615dc5d", null, "Director", "DIRECTOR" },
                    { "fdca1225-bcb1-439a-a40a-045dae654645", null, "Collab", "COLLAB" }
                });
        }
    }
}
