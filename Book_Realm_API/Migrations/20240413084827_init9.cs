using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_API.Migrations
{
    /// <inheritdoc />
    public partial class init9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "HeroId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Heroes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlaceHolder = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClickUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Heroes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_HeroId",
                table: "Images",
                column: "HeroId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Heroes_HeroId",
                table: "Images",
                column: "HeroId",
                principalTable: "Heroes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Heroes_HeroId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "Heroes");

            migrationBuilder.DropIndex(
                name: "IX_Images_HeroId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "HeroId",
                table: "Images");
        }
    }
}
