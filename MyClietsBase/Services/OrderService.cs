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
    void Update(Order order, OrderPrepayment op);
    void CreateOrder(Order order);
    IList<ProductsReport> GenerateProductReport(int userId, DateTime dateStart, DateTime dateEnd, out List<MonthReport> monthReport);
  }
  public class OrderService : IOrderService
  {
    private UnitOfWork _unitOfWork;
    private IRepository<Order> _repository;
    private IRepository<OrderPrepayment> _repositoryPrepayment;

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
      /* var dataSource =
         _repository.Query(
         order => order.UserId == userId &&
         order.Removed != true &&
         order.Date >= dateStart.Date && order.Date <= dateEnd.Date,
         p => p.ProductInfo,
         op => op.Prepayment
         )
         .ToList();
       var data = dataSource
         .Select(
         field => new
         {
           ProductId = field.ProductId,
           ProductName = field.ProductInfo.Name,
           Total = field.Total,// + field.Prepay,
           Date = field.Date,
           Prepay = field.Prepayment?.Total,
           DatePrepay = field.Prepayment?.Date
         });
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
       var prepayments = data.Where(order => order.DatePrepay >= dateStart.Date && order.DatePrepay <= dateEnd.Date)
         .Sum(order => order.Prepay);

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

       var prepayData = new ProductsReport
       {
         ProductName = "Предоплата",
         Sum = Convert.ToDecimal(prepayments)
       };

       report.Add(prepayData);
       return report;*/
      monthReport = null;
      return null;
    }
    /// <summary>
    /// Updating Order data
    /// </summary>
    /// <param name="order">Order</param>
    public void Update(Order order, OrderPrepayment op)
    {
      _repositoryPrepayment = _unitOfWork.EfRepository<OrderPrepayment>();
      _repository.Update(order);
      var prepayment = _repositoryPrepayment.Find(p=>p.OrderId == order.Id);
      if (prepayment == null)
      {
        op.OrderId = order.Id;
        _repositoryPrepayment.Add(op);
      }
      else
      {
        prepayment.Total = op.Total;
        prepayment.Date = op.Date;
        _repositoryPrepayment.Save();
      }
    }

    public void CreateOrder(Order order)
    {
      _repository.Add(order);
      //_repository.Save();
    }
  }
}
