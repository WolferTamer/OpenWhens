using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbooOpenWhen.Migrations
{
    /// <inheritdoc />
    public partial class Sent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "sent",
                table: "Letters",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sent",
                table: "Letters");
        }
    }
}
