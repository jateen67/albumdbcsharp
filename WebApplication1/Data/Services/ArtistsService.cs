using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data.Services
{
    public class ArtistsService : IArtistsService
    {

        private readonly AppDbContext _context;

        public ArtistsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(Artist artist)
        {
            await _context.Artists.AddAsync(artist);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var result = await _context.Artists.FindAsync(id);
            _context.Artists.Remove(result);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<IEnumerable<Artist>>> GetAll()
        {
            return await _context.Artists.Include(c => c.Albums).ToListAsync();
        }

        public async Task<Artist> GetById(int id)
        {
            return await _context.Artists.Where(ar => ar.ArtistId == id).Include(a => a.Albums).SingleOrDefaultAsync<Artist>();
        }

        public async Task<Artist> Update(int id, Artist artist)
        {
            _context.Update(artist);
            await _context.SaveChangesAsync();
            return artist;
        }
    }
}
