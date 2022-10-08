using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Data.Services
{
    public interface IArtistsService
    {
        Task<ActionResult<IEnumerable<Artist>>> GetAll();

        Task<Artist> GetById(int id);

        Task Add(Artist artist);

        Task<Artist> Update(int id, Artist artist);

        Task Delete(int id);
    }
}
