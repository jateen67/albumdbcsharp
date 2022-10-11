using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebApplication1.Data.Base;

namespace WebApplication1.Models
{
    public class Album : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Title { get; set; }

        [Required]
        [MaxLength(300)]
        public string Description { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Cover { get; set; }

        [Required]
        [ForeignKey("ArtistId")]
        public int ArtistId { get; set; }

        [JsonIgnore]
        public Artist? Artist { get; set; }

    }
}
