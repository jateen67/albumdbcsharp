using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Services;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlbumController : Controller
    {

        private readonly IAlbumsService _service;
        private readonly IMapper _mapper;

        public AlbumController(IAlbumsService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAlbums()
        {
            var album = await _service.GetAll(n => n.Artist);
            var albumsDto = _mapper.Map<IEnumerable<AlbumDto>>(album);
            return Ok(albumsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbum(int id)
        {
            var album = await _service.GetById(id, n => n.Artist);

            if (album == null)
            {
                return NotFound();
            }

            var albumDto = _mapper.Map<AlbumDto>(album);

            return Ok(albumDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAlbum(AlbumDto albumDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            var album = _mapper.Map<Album>(albumDto);
            var albumReadDto = _mapper.Map<AlbumDto>(album);

            await _service.Add(album);
            return CreatedAtAction(nameof(GetAlbum), new { id = albumReadDto.Id }, albumReadDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, AlbumDto albumDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            var album = await _service.GetById(id);
            _mapper.Map(albumDto, album);
            await _service.Update(album);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
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
