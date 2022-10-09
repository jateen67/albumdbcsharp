using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    public class Album
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        
        public string Description { get; set; }

        public int Duration { get; set; }

        public DateTime Date { get; set; }

        public string Cover { get; set; }

        [ForeignKey("ArtistId")]
        public int ArtistId { get; set; }
        [JsonIgnore]
        public Artist? Artist { get; set; }

    }
}
