using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_API.Migrations
{
    /// <inheritdoc />
    public partial class init11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Heroes_HeroId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Heroes",
                table: "Heroes");

            migrationBuilder.RenameTable(
                name: "Heroes",
                newName: "Heros");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Heros",
                table: "Heros",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "HeroInSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeroId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroInSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeroInSections_Heros_HeroId",
                        column: x => x.HeroId,
                        principalTable: "Heros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HeroInSections_HomePageSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "HomePageSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HeroInSections_HeroId",
                table: "HeroInSections",
                column: "HeroId");

            migrationBuilder.CreateIndex(
                name: "IX_HeroInSections_SectionId",
                table: "HeroInSections",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Heros_HeroId",
                table: "Images",
                column: "HeroId",
                principalTable: "Heros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Heros_HeroId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "HeroInSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Heros",
                table: "Heros");

            migrationBuilder.RenameTable(
                name: "Heros",
                newName: "Heroes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Heroes",
                table: "Heroes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Heroes_HeroId",
                table: "Images",
                column: "HeroId",
                principalTable: "Heroes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
