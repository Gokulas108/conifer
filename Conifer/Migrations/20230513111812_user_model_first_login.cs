using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conifer.Migrations
{
    /// <inheritdoc />
    public partial class user_model_first_login : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "first_login",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "first_login",
                table: "Users");
        }
    }
}
