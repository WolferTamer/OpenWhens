using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbooOpenWhen.Migrations
{
    /// <inheritdoc />
    public partial class Sent2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sent",
                table: "Letters",
                newName: "Sent");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sent",
                table: "Letters",
                newName: "sent");
        }
    }
}
