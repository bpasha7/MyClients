using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Data.Reports;
using Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
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
    void Update(Order order, OrderPrepayment op, IList<int> productsId);
    IList<Order> GetCurrentOrders(int userId);
    void CreateOrder(Order order, IList<int> productsId);
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
    public void Update(Order order, OrderPrepayment op, IList<int> productsId)
    {
      //_repositoryPrepayment = _unitOfWork.EfRepository<OrderPrepayment>();
      _repository.Update(order);

      var toUpdate =_repository.Query(o => o.Id == order.Id)
        .Include(p => p.Prepayment)
        .Include(oi => oi.Items)
          .ThenInclude(i => i.ProductInfo)
      .SingleOrDefault();

      var newItems = new List<OrderItem>();

      //var duplicate = toUpdate.Items.Select(i => i.Id).Intersect(productsId);

      //var haveItems = toUpdate.Items.Where(oi => productsId.Contains(oi.Id));

      //var haveNot = haveItems.Select(oi => !productsId.Contains(oi.Id));

      //foreach (var item in toUpdate.Items)
      //{
      //  if (duplicate.Contains(item.Id))
      //    continue;
      //  else
      //    toUpdate.Items
      //}

      foreach (var id in productsId)
      {
        //if(toUpdate.Items.cou)
        newItems.Add(new OrderItem
        {
          ProductId = id
        });
      }
      toUpdate.Items = newItems;

      //var prepayment = _repositoryPrepayment.Find(p=>p.OrderId == order.Id);
      if (toUpdate.Prepayment == null)
      {
        toUpdate.Prepayment = op;
        //_repositoryPrepayment.Add(op);
      }
      else
      {
        toUpdate.Prepayment.Total = op.Total;
        toUpdate.Prepayment.Date = op.Date;
      }
      _repository.Save();
    }

    public void CreateOrder(Order order, IList<int> productsId)
    {

      order.Items = new List<OrderItem>();
      foreach (var id in productsId)
      {
        order.Items.Add(new OrderItem
        {
           ProductId = id
        });
      }
      _repository.Add(order);

      //_repository.Save();
    }

    public IList<Order> GetCurrentOrders(int userId)
    {

      return _repository.Query(e => e.Date >= DateTime.Now.Date && e.Removed != true)//, oi => oi.Items)
        .Include(oi => oi.Items)
          .ThenInclude( i => i.ProductInfo)
        //.SelectMany(i. => i.ProductInfo)
        .OrderByDescending(o => o.Date)
        .AsNoTracking()
        .ToList();
    }
  }
}
