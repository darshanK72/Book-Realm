using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_API.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Author_Description",
                table: "Users",
                newName: "AuthorDescription");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthorDescription",
                table: "Users",
                newName: "Author_Description");
        }
    }
}
