using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MyClientsBase.Migrations
{
    public partial class BonusBalanceCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<decimal>(
                name: "BonusBalance",
                table: "Users",
                nullable: false,
                defaultValue: 0m);
        }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
                name: "BonusBalance",
                table: "Users");
    }
    }
}
