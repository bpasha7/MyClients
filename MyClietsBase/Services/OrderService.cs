using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Data.Reports;
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
    void ChangeStatus(int userId, int orderId);
    /// <summary>
    /// Updating Order data
    /// </summary>
    /// <param name="order">Order</param>
    void Update(Order order);
    IList<ProductsReport> GenerateProductReport(int userId, DateTime dateStart, DateTime dateEnd, out List<MonthReport> monthReport);
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

    public void ChangeStatus(int userId, int orderId)
    {
      var order = _repository.Find(o => o.UserId == userId && o.Id == orderId);
      order.Removed = !order.Removed;
      _repository.Update(order);
      _repository.Save();
    }

    public IList<ProductsReport> GenerateProductReport(int userId, DateTime dateStart, DateTime dateEnd, out List<MonthReport> monthReport)
    {
      var data = _repository.Query(
        order => order.UserId == userId &&
        order.Removed != true &&
        order.Date >= dateStart.Date && order.Date <= dateEnd.Date,
        p => p.ProductInfo
        )
        .Select(
        field => new
        {
          ProductId = field.ProductId,
          ProductName = field.ProductInfo.Name,
          Total = field.Total + field.Prepay,
          Date = field.Date
        })
        .ToList();
      monthReport = data
             .GroupBy(g => new
             {
               Y = g.Date.Year,
               M = g.Date.Month,
               Month = $"{g.Date:MMM}",
               MonthNumber = g.Date.Month,
             }
        )
        .Select(rep =>
         new MonthReport
         {
           Year = rep.Key.Y,
           Month = rep.Key.Month,
           MonthNumber = rep.Key.MonthNumber,
           Total = rep.Sum(s => s.Total)
         }
        )
        //.OrderBy(m => m.Year)
        .ToList();

      var report = data
        .GroupBy(g => new { g.ProductId, g.ProductName })
        .Select(rep =>
         new ProductsReport
         {
           ProductName = rep.Key.ProductName,
           Sum = rep.Sum(s => s.Total)
         }
        )
        .ToList();
      return report;
    }
    /// <summary>
    /// Updating Order data
    /// </summary>
    /// <param name="order">Order</param>
    public void Update(Order order)
    {
      _repository.Update(order);
      _repository.Save();
    }
  }
}
