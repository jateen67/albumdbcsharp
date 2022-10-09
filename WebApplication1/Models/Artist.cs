using System.ComponentModel.DataAnnotations;
using WebApplication1.Data.Base;

namespace WebApplication1.Models
{
    public class Artist : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }

        public string Bio { get; set; }

        public List<Album> Albums { get; set; } = new List<Album>();
    }
}
