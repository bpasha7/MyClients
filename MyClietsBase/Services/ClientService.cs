using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
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
  public interface IClientService
  {
    void Create(Client client);
    void Update(Client client);
    Client Get(int userId, int id);
    IList<Client> GetClients(int userId);
    IList<Order> GetOrders(int userId, int clientId);
  }
  public class ClientService : IClientService
  {
    private UnitOfWork _unitOfWork;
    private IRepository<Client> _repository;
    private readonly AppSettings _appSettings;
    public ClientService(ApplicationDbContext context, IOptions<AppSettings> appSettings)
    {
      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<Client>();
      _appSettings = appSettings.Value;
    }
    public void Create(Client client)
    {
      _repository.Add(client);
      _repository.Save();
    }

    public IList<Client> GetClients(int userId)
    {
      return _repository.Query(c => c.UserId == userId).OrderBy(o => o.LastName).AsNoTracking().ToList();
    }



    public Client Get(int userId, int id)
    {
      var client = _repository.Query(c => c.Id == id && c.UserId == userId, or => or.Orders).AsNoTracking().SingleOrDefault();
      //if (client == null)
      //  throw new AppException("Клиент не найден в базе!");
      //else
      return client;
    }

    public IList<Order> GetOrders(int userId, int clientId)
    {
      return _repository.Find(c => c.Id == clientId, or => or.Orders).Orders.OrderByDescending(o => o.Date).ToList();
    }

    public void Update(Client client)
    {
      _repository.Update(client);
      _repository.Save();
    }
  }
}
