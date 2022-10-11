using MusicDatabase.Data.Base;
using MusicDatabase.Models;

namespace MusicDatabase.Data.Services
{
    public class ArtistsService : EntityBaseRepository<Artist>, IArtistsService
    {
        public ArtistsService(AppDbContext context) : base(context)
        {
        }
    }
}
