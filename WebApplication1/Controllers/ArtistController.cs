using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Services;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController : Controller
    {

        private readonly IArtistsService _service;
        private readonly IMapper _mapper;

        public ArtistController(IArtistsService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetArtists()
        {
            var artists = await _service.GetAll(n => n.Albums);
            var artistsDto = _mapper.Map<IEnumerable<ArtistDto>>(artists);
            return Ok(artistsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtist(int id)
        {
            var artist = await _service.GetById(id, n => n.Albums);

            if (artist == null)
            {
                return NotFound();
            }

            var artistDto = _mapper.Map<ArtistDto>(artist);

            return Ok(artistDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArtist(ArtistDto artistDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            var artist = _mapper.Map<Artist>(artistDto);
            var artistReadDto = _mapper.Map<ArtistDto>(artist);

            await _service.Add(artist);
            return CreatedAtAction(nameof(GetArtist), new { id = artistReadDto.Id }, artistReadDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtist(int id, ArtistDto artistDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            var artist = await _service.GetById(id);
            _mapper.Map(artistDto, artist);
            await _service.Update(artist);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(int id)
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
