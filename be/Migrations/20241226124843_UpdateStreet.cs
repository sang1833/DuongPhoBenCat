using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStreet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<double>(
                name: "Opacity",
                table: "Streets",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "Opacity",
                table: "Streets",
                type: "integer",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);

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
    }
}
