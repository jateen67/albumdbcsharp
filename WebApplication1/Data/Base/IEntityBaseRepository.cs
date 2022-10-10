using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using WebApplication1.Models;

namespace WebApplication1.Data.Base
{
    public interface IEntityBaseRepository<T> where T: class, IEntityBase, new()
    {
        Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes);

        Task<T> GetById(int id, params Expression<Func<T, object>>[] includes);

        Task Add(T entity);

        Task Update(T entity);

        Task Delete(int id);
    }
}
