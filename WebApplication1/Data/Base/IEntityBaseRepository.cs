using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Data.Base
{
    public interface IEntityBaseRepository<T> where T: class, IEntityBase, new()
    {
        Task<ActionResult<IEnumerable<T>>> GetAll();

        Task<T> GetById(int id);

        Task Add(T entity);

        Task Update(int id, T entity);

        Task Delete(int id);
    }
}
