using Domain.Interfaces.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.EF.Repositories
{
    public class EfRepository<T> : IDisposable, IRepository<T> where T : class, IBaseEntity
    {
        private readonly ApplicationDbContext _context;

        public EfRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<T> ToList()
        {
            return DbSet.ToList();
        }
        
        protected virtual DbSet<T> DbSet
        {
            get
            {
                return _context.Set<T>();
            }
        }

        public void Add(T t)
        {
            DbSet.Add(t);
            Save();
        }

        public void AddOrUpdate(T t)
        {
            var entry = _context.Entry(t);
            DbSet.Attach(t);
            entry.State = EntityState.Modified;
            Save();
        }

        public bool Any()
        {
            return DbSet.Any();
        }

        public int Count(Expression<Func<T, bool>> expression)
        {
            return DbSet.Count(expression);
        }

        public int Count(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var items = Query(expression, includes);

            return items.Count();
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> expression)
        {
            return await DbSet.CountAsync(expression);
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var items = Query(expression, includes);

            return await items.CountAsync();
        }

        public T Find(params object[] keys)
        {
            return DbSet.Find(keys);
        }

        public T Find(Expression<Func<T, bool>> expression)
        {
            return DbSet.FirstOrDefault(expression);
        }

        public T Find(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var items = Query(expression, includes);

            return items.FirstOrDefault();
        }

        public async Task<T> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await DbSet.FirstOrDefaultAsync(expression);
        }

        public async Task<T> FindAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var items = Query(expression, includes);

            return await items.FirstOrDefaultAsync();
        }

        public IQueryable<T> Query(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes)
        {
            var result = filter == null ?
                DbSet.AsQueryable() :
                DbSet.Where(filter);

            return includes.Aggregate(result, (current, include) => current.Include(include));
        }

        public void Remove(params object[] keyss)
        {

            DbSet.Remove(DbSet.Find(keyss));

            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(T t)
        {
            var entry = _context.Entry(t);
            DbSet.Attach(t);
            entry.State = EntityState.Modified;

            Save();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                if (_context != null)
                {
                    _context.Dispose();
                }
            }

            disposed = true;
        }

        ~EfRepository()
        {
            Dispose(false);
        }
    }
}
