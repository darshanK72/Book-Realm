using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_API.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Banner_BannerId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Banner",
                table: "Banner");

            migrationBuilder.RenameTable(
                name: "Banner",
                newName: "Banners");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Banners",
                table: "Banners",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Banners_BannerId",
                table: "Images",
                column: "BannerId",
                principalTable: "Banners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Banners_BannerId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Banners",
                table: "Banners");

            migrationBuilder.RenameTable(
                name: "Banners",
                newName: "Banner");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Books",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Banner",
                table: "Banner",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Banner_BannerId",
                table: "Images",
                column: "BannerId",
                principalTable: "Banner",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
