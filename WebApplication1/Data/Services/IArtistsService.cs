using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data.Base;
using WebApplication1.Models;

namespace WebApplication1.Data.Services
{
    public interface IArtistsService : IEntityBaseRepository<Artist>
    {
    }
}
