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
  public interface IBonusService
  {
    IList<BonusIncome> BonusHistory(int userId, out IList<BonusIncomeType> bonusTypes, int skip, int take);
  }
  public class BonusService : IBonusService
  {
    private UnitOfWork _unitOfWork;
    private IRepository<BonusIncome> _repository;
    private IRepository<BonusIncomeType> _repositoryTypes;

    private readonly AppSettings _appSettings;
    public BonusService(ApplicationDbContext context, IOptions<AppSettings> appSettings)
    {
      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<BonusIncome>();
      _repositoryTypes = _unitOfWork.EfRepository<BonusIncomeType>();
      _appSettings = appSettings.Value;
    }

    public IList<BonusIncome> BonusHistory(int userId, out IList<BonusIncomeType> bonusTypes, int skip, int take)
    {
      bonusTypes = skip != 0 ? null : _repositoryTypes.ToList();
      return _repository
        .Query(b => b.UserId == userId)
        .Select(bonus => new BonusIncome
        {
          TypeId = bonus.TypeId,
          Date = bonus.Date,
          Total = bonus.Total
        })
        .OrderByDescending(o=>o.Date)
        .Skip(skip)
        .Take(take)
        .ToList();
    }
  }
}

