using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : Controller
    {
        private readonly AppDbContext _context;

        public AlbumController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            try
            {
                return _context.Albums.Include(c => c.Artist).ToList();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error getting albums");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            return album;
        }

        [HttpPost]
        public async Task<ActionResult<Album>> CreateAlbum(Album album)
        {
            Artist newArtist = _context.Artists.Find(album.ArtistId);

            var newAlbum = new Album()
            {
                Title = album.Title,
                Description = album.Description,
                Duration = album.Duration,
                Date = album.Date,
                Cover = album.Cover,
                ArtistId = album.ArtistId,
                Artist = newArtist
            };

            await _context.Albums.AddAsync(newAlbum);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlbum), new { id = album.AlbumId }, album);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Album>> UpdateAlbum(int id, Album album)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            var existingAlbum = _context.Albums.Where(a => a.AlbumId == id).FirstOrDefault<Album>();
            Artist newArtist = _context.Artists.Find(album.ArtistId);
            
            if (existingAlbum != null)
            {
                existingAlbum.Title = album.Title;
                existingAlbum.Description = album.Description;
                existingAlbum.Duration = album.Duration;
                existingAlbum.Date = album.Date;
                existingAlbum.Cover = album.Cover;
                existingAlbum.ArtistId = album.ArtistId;
                existingAlbum.Artist = newArtist;
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Album>> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
