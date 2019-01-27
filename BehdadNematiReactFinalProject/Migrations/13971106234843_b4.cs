using Microsoft.EntityFrameworkCore.Migrations;

namespace BehdadNematiReactFinalProject.Migrations
{
    public partial class b4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Brand_Id",
                table: "products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_products_Brand_Id",
                table: "products",
                column: "Brand_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_products_Brands_Brand_Id",
                table: "products",
                column: "Brand_Id",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_products_Brands_Brand_Id",
                table: "products");

            migrationBuilder.DropIndex(
                name: "IX_products_Brand_Id",
                table: "products");

            migrationBuilder.DropColumn(
                name: "Brand_Id",
                table: "products");
        }
    }
}
