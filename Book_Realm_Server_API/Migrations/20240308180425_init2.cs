using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Realm_Server_API.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UerRoles_Roles_RoleId",
                table: "UerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UerRoles_Users_UserId",
                table: "UerRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UerRoles",
                table: "UerRoles");

            migrationBuilder.RenameTable(
                name: "UerRoles",
                newName: "UserRoles");

            migrationBuilder.RenameIndex(
                name: "IX_UerRoles_UserId",
                table: "UserRoles",
                newName: "IX_UserRoles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UerRoles_RoleId",
                table: "UserRoles",
                newName: "IX_UserRoles_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                newName: "UerRoles");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserId",
                table: "UerRoles",
                newName: "IX_UerRoles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_RoleId",
                table: "UerRoles",
                newName: "IX_UerRoles_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UerRoles",
                table: "UerRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UerRoles_Roles_RoleId",
                table: "UerRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UerRoles_Users_UserId",
                table: "UerRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
