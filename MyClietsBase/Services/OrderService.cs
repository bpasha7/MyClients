using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Domain.Interfaces.Repositories;
using Microsoft.Extensions.Options;
using MyClientsBase.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyClientsBase.Services
{
  public interface IOrderService
  {
    void SetAsRemoved(int userId, int orderId);
  }
  public class OrderService : IOrderService
  {
    private UnitOfWork _unitOfWork;
    private IRepository<Order> _repository;
    private readonly AppSettings _appSettings;
    public OrderService(ApplicationDbContext context, IOptions<AppSettings> appSettings)
    {
      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<Order>();
      _appSettings = appSettings.Value;
    }

    public void SetAsRemoved(int userId, int orderId)
    {
      var order = _repository.Find(o => o.UserId == userId && o.Id == orderId);
      order.Removed = true;
      _repository.Update(order);
      _repository.Save();
    }
  }
}
