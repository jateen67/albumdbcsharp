using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>()
                .HasOne(ar => ar.Artist)
                .WithMany(al => al.Albums)
                .HasForeignKey(ar => ar.ArtistId);
        }

        public DbSet<Artist> Artists { get; set; }

        public DbSet<Album> Albums { get; set; }
    }
}
