using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Artist
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }

        public string Bio { get; set; }

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
