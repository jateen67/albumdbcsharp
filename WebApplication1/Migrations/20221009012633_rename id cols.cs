using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    public partial class renameidcols : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArtistId",
                table: "Artists",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AlbumId",
                table: "Albums",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Artists",
                newName: "ArtistId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Albums",
                newName: "AlbumId");
        }
    }
}
