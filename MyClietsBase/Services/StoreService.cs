using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyClientsBase.Services
{
  public interface IStoreService
  {
    Store GetStore(string storeName);
  }
  public class StoreService : IStoreService
  {
    private UnitOfWork _unitOfWork;
    /// <summary>
    /// Store repository
    /// </summary>
    private IRepository<Store> _repository;

    public StoreService(ApplicationDbContext context)
    {
      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<Store>();
    }
    public Store GetStore(string storeName)
    {
      throw new NotImplementedException();
    }
  }
}
