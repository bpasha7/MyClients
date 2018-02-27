using Data.EF.Repositories;
using Domain.Interfaces.Entities;
using Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;

namespace Data.EF.UnitOfWork
{
    public class UnitOfWork : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed;
        private Dictionary<string, object> repositories;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public UnitOfWork()
        {
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public IRepository<T> EfRepository<T>() where T : class, IBaseEntity
        {
            if (repositories == null)
            {
                repositories = new Dictionary<string, object>();
            }

            var type = typeof(T).Name;

            if (!repositories.ContainsKey(type))
            {
                var repositoryType = typeof(EfRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);
                repositories.Add(type, repositoryInstance);
            }
            return (EfRepository<T>)repositories[type];
        }

    }
}
