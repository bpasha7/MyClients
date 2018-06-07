using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MyClientsBase.Migrations
{
    public partial class Edituserandstorefields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasPhoto",
                table: "Stores");

            migrationBuilder.AddColumn<bool>(
                name: "HasPhoto",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "Visits",
                table: "Stores",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasPhoto",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Visits",
                table: "Stores");

            migrationBuilder.AddColumn<bool>(
                name: "HasPhoto",
                table: "Stores",
                nullable: false,
                defaultValue: false);
        }
    }
}
