﻿using Data.EF.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Data.EF
{
    public class ApplicationDbContext : DbContext
    {
        private DbContextOptions _options;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public ApplicationDbContext(DbContextOptions options)
        {
            _options = options;
        }

        /// <summary>
        /// Users info
        /// </summary>
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Discount> Discounts { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Outgoing> Outgoings { get; set; }
        public virtual DbSet<OrderPrepayment> OrderPrepayment { get; set; }
        public virtual DbSet<OrderItem> OrdersItems { get; set; }
        public virtual DbSet<BonusIncome> BonusIncomes { get; set; }
        public virtual DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Store>()
            .HasIndex(store => store.Name)
            .IsUnique();
        }

    }
}
