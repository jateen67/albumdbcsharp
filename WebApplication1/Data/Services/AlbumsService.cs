using MusicDatabase.Data.Base;
using MusicDatabase.Models;

namespace MusicDatabase.Data.Services
{
    public class AlbumsService : EntityBaseRepository<Album>, IAlbumsService
    {
        public AlbumsService(AppDbContext context) : base(context)
        {
        }
    }
}
