using System.ComponentModel.DataAnnotations;
using MusicDatabase.Data.Base;

namespace MusicDatabase.Models
{
    public class Artist : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        [Required]
        [MaxLength(300)]
        public string Bio { get; set; }

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
