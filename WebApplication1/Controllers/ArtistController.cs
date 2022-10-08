using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data.Services;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController : Controller
    {
        private readonly IArtistsService _service;

        public ArtistController(IArtistsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artist>>> GetArtists()
        {
            try
            {
                return await _service.GetAll();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error getting artists");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetArtist(int id)
        {
            var artist = await _service.GetById(id);

            if (artist == null)
            {
                return NotFound();
            }

            return artist;
        }

        [HttpPost]
        public async Task<ActionResult<Artist>> CreateArtist(Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            await _service.Add(artist);
            return CreatedAtAction(nameof(GetArtist), new { id = artist.ArtistId}, artist);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Artist>> UpdateArtist(int id, Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            await _service.Update(id, artist);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Artist>> DeleteArtist(int id)
        {
            var artist = await _service.GetById(id);

            if (artist == null)
            {
                return NotFound();
            }

            await _service.Delete(id);
            return Ok();
        }
    }
}
