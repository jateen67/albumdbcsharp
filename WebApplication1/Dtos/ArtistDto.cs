using MusicDatabase.Models;

namespace MusicDatabase.Dtos
{
    public class ArtistDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Bio { get; set; }

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
