using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace MusicDatabase.Data.Base
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {

        private readonly AppDbContext _context;

        public EntityBaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task Delete(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            query = includes.Aggregate(query, (current, includes) => current.Include(includes));
            return await query.ToListAsync();
        }

        public async Task<T> GetById(int id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>().Where(ar => ar.Id == id);
            query = includes.Aggregate(query, (current, includes) => current.Include(includes));
            return await query.SingleOrDefaultAsync();
        }

        public async Task Update(T entity)
        {
            EntityEntry entry = _context.Entry<T>(entity);
            entry.State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
