﻿// <auto-generated />
using Data.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Storage.Internal;
using System;

namespace MyClientsBase.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180418082518_messages status")]
    partial class messagesstatus
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("Data.EF.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime");

                    b.Property<string>("Commentary")
                        .HasMaxLength(128);

                    b.Property<string>("FirstName")
                        .HasMaxLength(128);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<string>("Link")
                        .HasMaxLength(128);

                    b.Property<string>("LinkPhoto")
                        .HasMaxLength(128);

                    b.Property<string>("Phone")
                        .HasMaxLength(50);

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Data.EF.Entities.Discount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<float>("Percent");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("Data.EF.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("From")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<bool?>("IsRead");

                    b.Property<bool?>("IsRemoved");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<int>("Type");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Data.EF.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClientId");

                    b.Property<string>("Commentary");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Location");

                    b.Property<int?>("ProductId");

                    b.Property<bool?>("Removed");

                    b.Property<decimal>("Total");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Data.EF.Entities.Outgoing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<decimal>("Total");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Outgoings");
                });

            modelBuilder.Entity("Data.EF.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<decimal>("Price");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Data.EF.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("VARBINARY(128)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("VARBINARY(128)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Data.EF.Entities.Client", b =>
                {
                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany("Clients")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Data.EF.Entities.Discount", b =>
                {
                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany("Discounts")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Data.EF.Entities.Message", b =>
                {
                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Data.EF.Entities.Order", b =>
                {
                    b.HasOne("Data.EF.Entities.Client", "ClientInfo")
                        .WithMany("Orders")
                        .HasForeignKey("ClientId");

                    b.HasOne("Data.EF.Entities.Product", "ProductInfo")
                        .WithMany()
                        .HasForeignKey("ProductId");

                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Data.EF.Entities.Outgoing", b =>
                {
                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Data.EF.Entities.Product", b =>
                {
                    b.HasOne("Data.EF.Entities.User", "UserInfo")
                        .WithMany("Products")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
