using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Data.Services;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : Controller
    {
        private readonly IAlbumsService _service;

        public AlbumController(IAlbumsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            try
            {
                return await _service.GetAll(n => n.Artist);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error getting albums");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await _service.GetById(id, n => n.Artist);

            if (album == null)
            {
                return NotFound();
            }

            return album;
        }

        [HttpPost]
        public async Task<ActionResult<Album>> CreateAlbum(Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            await _service.Add(album);
            return CreatedAtAction(nameof(GetAlbum), new { id = album.Id }, album);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Album>> UpdateAlbum(int id, Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            await _service.Update(id, album);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Album>> DeleteAlbum(int id)
        {
            var album = await _service.GetById(id);

            if (album == null)
            {
                return NotFound();
            }

            await _service.Delete(id);
            return Ok();
        }
    }
}
