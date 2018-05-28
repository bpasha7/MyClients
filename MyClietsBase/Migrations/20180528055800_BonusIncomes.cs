using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MyClientsBase.Migrations
{
    public partial class BonusIncomes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BonusIncomeType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusIncomeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BonusIncome",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Total = table.Column<decimal>(maxLength: 256, nullable: false),
                    TypeId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BonusIncome", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BonusIncome_BonusIncomeType_TypeId",
                        column: x => x.TypeId,
                        principalTable: "BonusIncomeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BonusIncome_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BonusIncome_TypeId",
                table: "BonusIncome",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BonusIncome_UserId",
                table: "BonusIncome",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BonusIncome");

            migrationBuilder.DropTable(
                name: "BonusIncomeType");
        }
    }
}
