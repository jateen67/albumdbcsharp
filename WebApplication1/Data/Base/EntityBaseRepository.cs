using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;
using WebApplication1.Models;

namespace WebApplication1.Data.Base
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {

        private readonly AppDbContext _context;

        public EntityBaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(T entity) => await _context.Set<T>().AddAsync(entity);

        public async Task Delete(int id)
        {
            var entity = await _context.Set<T>().Where(ar => ar.Id == id).Include(a => _context.Set<T>()).SingleOrDefaultAsync<T>();
            EntityEntry entry = _context.Entry<T>(entity);
            entry.State = EntityState.Deleted;
        }

        public async Task<ActionResult<IEnumerable<T>>> GetAll() => await _context.Set<T>().Include(c => _context.Set<T>()).ToListAsync();

        public async Task<T> GetById(int id) => await _context.Set<T>().Where(ar => ar.Id == id).Include(a => _context.Set<T>()).SingleOrDefaultAsync<T>();

        public async Task Update(int id, T entity)
        {
            EntityEntry entry = _context.Entry<T>(entity);
            entry.State = EntityState.Modified;
        }
    }
}
