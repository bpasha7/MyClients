using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MyClientsBase.Migrations
{
    public partial class prepayment_test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prepay",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "OrderPrepayment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    Total = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderPrepayment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderPrepayment_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPrepayment_OrderId",
                table: "OrderPrepayment",
                column: "OrderId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderPrepayment");

            migrationBuilder.AddColumn<decimal>(
                name: "Prepay",
                table: "Orders",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
