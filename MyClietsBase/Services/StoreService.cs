using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using MyClientsBase.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyClientsBase.Services
{
  public interface IStoreService
  {
    /// <summary>
    /// Getting store data for clients sharing
    /// </summary>
    /// <param name="storeName">Store unique name</param>
    /// <returns>Store Data</returns>
    Store GetStore(string storeName);
    /// <summary>
    /// Prolong period store activation
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <param name="storeId">Store Id</param>
    /// <param name="days">Days number</param>
    /// <returns>Prolong date</returns>
    DateTime ProlongPeriond(int userId, int storeId, int days, BonusIncome bonus, out decimal balance);
    /// <summary>
    /// Update only store info
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <param name="editedStore">Store to be updated</param>
    void UpdateInfo(int userId, Store editedStore);
    void AddVisit(int storeId);
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

    public void AddVisit(int storeId)
    {
      var store = _repository.Find(s => s.Id == storeId);
      if (store == null)
        return;
      store.Visits++;
      _repository.Save();
    }

    public Store GetStore(string storeName)
    {
      return _repository.Query(store => store.Name == storeName && store.IsActive)
        .Include(store => store.UserInfo)
        .ThenInclude(user => user.Products)
        .AsNoTracking()
        .Select(s => new Store
        {
          Id = s.Id,
          Name = s.Name,
          About = s.About,
          Visits = s.Visits,
          UserInfo = s.UserInfo,
          Products = s.UserInfo.Products.Where(p => !p.IsRemoved && p.Show).ToList()
        }
        )
        .SingleOrDefault();
    }

    public DateTime ProlongPeriond(int userId, int storeId, int days, BonusIncome bonus, out decimal balance)
    {
      //find store if exist
      var store = _repository.Query(s => s.Id == storeId && s.UserId == userId)
        .Include(s => s.UserInfo)
        .ThenInclude(u => u.BonusIncomes)
        .SingleOrDefault();
      if (store == null)
        throw new AppException("Магазин не найден!");
      if (store.UserInfo.BonusBalance < -bonus.Total)
        throw new AppException("Недостаточно средств!");
      //if activation day is in past, calculate from today
      store.ActivationEnd = store.ActivationEnd.Date < DateTime.Now.Date ?
        DateTime.Now.Date.AddDays(days) :
        store.ActivationEnd.AddDays(days);
      store.IsActive = true;

      store.UserInfo.BonusIncomes.Add(bonus);
      store.UserInfo.BonusBalance += bonus.Total;
      //save changes
      _repository.Save();
      balance = store.UserInfo.BonusBalance;
      return store.ActivationEnd;
    }

    public void UpdateInfo(int userId, Store editedStore)
    {
      //find store if exist
      var store = _repository.Find(s => s.Id == editedStore.Id && s.UserId == userId);
      if (store == null)
        throw new AppException("Магазин не найден!");
      store.About = editedStore.About;
      store.Name = editedStore.Name;
      //save changes
      _repository.Save();
    }
  }
}
