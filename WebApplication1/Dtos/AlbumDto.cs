using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class AlbumDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Duration { get; set; }

        public DateTime Date { get; set; }

        public string Cover { get; set; }

        public int ArtistId { get; set; }

    }
}
