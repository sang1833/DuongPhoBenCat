using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class streetType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StreetType",
                table: "Streets");

            migrationBuilder.AddColumn<int>(
                name: "StreetTypeId",
                table: "Streets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "StreetTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StreetTypeName = table.Column<string>(type: "text", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StreetTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Streets_StreetTypeId",
                table: "Streets",
                column: "StreetTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets",
                column: "StreetTypeId",
                principalTable: "StreetTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Streets_StreetTypes_StreetTypeId",
                table: "Streets");

            migrationBuilder.DropTable(
                name: "StreetTypes");

            migrationBuilder.DropIndex(
                name: "IX_Streets_StreetTypeId",
                table: "Streets");

            migrationBuilder.DropColumn(
                name: "StreetTypeId",
                table: "Streets");

            migrationBuilder.AddColumn<string>(
                name: "StreetType",
                table: "Streets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
