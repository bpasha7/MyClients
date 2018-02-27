using System;
using Domain.Interfaces.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IRepository<T> where T : IBaseEntity
    {
        void Add(T t);

        IList<T> ToList();

        void Remove(params object[] keyss);

        void AddOrUpdate(T t);

        void Update(T t);

        void Save();
        Task SaveAsync();

        IQueryable<T> Query(Expression<Func<T, bool>> filter = null, params Expression<Func<T, object>>[] includes);
        T Find(params object[] keys);

        T Find(Expression<Func<T, bool>> expression);

        T Find(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);

        Task<T> FindAsync(Expression<Func<T, bool>> expression);
        Task<T> FindAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);

        bool Any();

        int Count(Expression<Func<T, bool>> expression);

        int Count(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);

        Task<int> CountAsync(Expression<Func<T, bool>> expression);
        Task<int> CountAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
    }
}
