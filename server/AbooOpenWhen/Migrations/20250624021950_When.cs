using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbooOpenWhen.Migrations
{
    /// <inheritdoc />
    public partial class When : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "When",
                table: "Letters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "When",
                table: "Letters");
        }
    }
}
