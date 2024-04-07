using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_API.Migrations
{
    /// <inheritdoc />
    public partial class init8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomePageSections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePageSections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BannersInSection",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BannerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BannersInSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BannersInSection_Banners_BannerId",
                        column: x => x.BannerId,
                        principalTable: "Banners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BannersInSection_HomePageSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "HomePageSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BooksInSection",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BooksInSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BooksInSection_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BooksInSection_HomePageSections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "HomePageSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BannersInSection_BannerId",
                table: "BannersInSection",
                column: "BannerId");

            migrationBuilder.CreateIndex(
                name: "IX_BannersInSection_SectionId",
                table: "BannersInSection",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_BooksInSection_BookId",
                table: "BooksInSection",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_BooksInSection_SectionId",
                table: "BooksInSection",
                column: "SectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BannersInSection");

            migrationBuilder.DropTable(
                name: "BooksInSection");

            migrationBuilder.DropTable(
                name: "HomePageSections");
        }
    }
}
