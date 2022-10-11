using System.Linq.Expressions;

namespace MusicDatabase.Data.Base
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
