using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class ArtistDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Bio { get; set; }

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
