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
    IList<Client> Get();
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

    public IList<Client> Get()
    {
      return _repository.Query(c => c.UserId == 1).AsNoTracking().ToList();
    }
  }
}
