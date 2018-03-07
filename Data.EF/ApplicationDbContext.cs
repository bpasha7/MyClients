using Data.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.EF
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        /// <summary>
        /// Users info
        /// </summary>
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
