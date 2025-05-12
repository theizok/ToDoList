using Microsoft.EntityFrameworkCore;
using ToDo.Shared.Entities;


namespace ToDo.API.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base(options){
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Assignment> Assignments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasMany(u => u.Assignments).WithOne(a => a.User).HasForeignKey(a => a.UserId);
            modelBuilder.Entity<Assignment>().HasIndex(a => a.UserId);
        }
    }
}
