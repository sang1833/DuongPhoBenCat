using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class StreetDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets");

            migrationBuilder.AddForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets",
                column: "StreetTypeId",
                principalTable: "StreetTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets");

            migrationBuilder.AddForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets",
                column: "StreetTypeId",
                principalTable: "StreetTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
