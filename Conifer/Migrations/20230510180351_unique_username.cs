using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conifer.Migrations
{
    /// <inheritdoc />
    public partial class unique_username : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_username",
                table: "Users",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_username",
                table: "Users");
        }
    }
}
