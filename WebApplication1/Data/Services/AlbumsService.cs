using WebApplication1.Data.Base;
using WebApplication1.Models;

namespace WebApplication1.Data.Services
{
    public class AlbumsService : EntityBaseRepository<Album>, IAlbumsService
    {
        public AlbumsService(AppDbContext context) : base(context)
        {
        }
    }
}
