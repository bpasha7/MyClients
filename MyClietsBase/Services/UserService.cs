using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Data.Reports;
using Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using MyClientsBase.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyClientsBase.Services
{
  public interface IUserService
  {
    /// <summary>
    /// User Authentication
    /// </summary>
    /// <param name="login">Login</param>
    /// <param name="password">Pass</param>
    /// <returns></returns>
    User Authenticate(string login, string password);
    User Create(User user, string password);
    void Confirm(string userLogin);
    User GetUserInfo(int userId);
    void UpdateUserPassword(int userId, string password);
    void CreateProduct(Product product);
    void SetAsRemovedProduct(int userId, int productId);
    void UpdateProduct(Product product, int done);
    void SetPhotoFlag(int userId, int productId);
    void SetPhotoFlag(int userId);
    void UpdateDiscount(Discount discount);
    void CreateDiscount(Discount discount);
    void CreateOutgoing(Outgoing outgoing);
    void UpdateOutgoing(int userId, Outgoing outgoing);
    void DeleteOutgoing(int userId, int outgoingId);
    void AddMessage(Message message, string storeName);
    void SetMessageAsRead(int userId, int messageId);
    IList<Product> GetProducts(int userId);
    IList<Discount> GetDiscounts(int userId);
    IList<Message> GetMessages(int userId);
    int GetCountUnreadMessages(int userId);
    IList<Outgoing> GetOutgoings(int userId, DateTime begin, DateTime end);
    IList<MonthReport> GenerateOutgoingsReport(int userId, DateTime dateStart, DateTime dateEnd);
    bool IncomeBonus(int userId, int type, decimal total, int limit);
  }
  public class UserService : IUserService
  {
    private UnitOfWork _unitOfWork;
    /// <summary>
    /// User repository
    /// </summary>
    private IRepository<User> _repository;

    private IRepository<Product> _productsRepository;

    private IRepository<Discount> _discountsRepository;

    private IRepository<Outgoing> _outgoingsRepository;

    private IRepository<Message> _messagesRepository;
    private IRepository<BonusIncome> _bonusRepository;

    public UserService(ApplicationDbContext context)
    {

      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<User>();
      _productsRepository = _unitOfWork.EfRepository<Product>();
      _discountsRepository = _unitOfWork.EfRepository<Discount>();
      _outgoingsRepository = _unitOfWork.EfRepository<Outgoing>();
      _messagesRepository = _unitOfWork.EfRepository<Message>();
      _bonusRepository = _unitOfWork.EfRepository<BonusIncome>();
    }
    #region Password Methods
    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
      if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
      if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

      using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != storedHash[i]) return false;
        }
      }

      return true;
    }
    #endregion
    public User Authenticate(string login, string password)
    {
      if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
        return null;

      var user = _repository.Find(x => x.Login == login);

      // check if username exists
      if (user == null)
        return null;

      if (user.Activated == false)
        throw new AppException("Обратитесь к администратору для активации!");

      // check if password is correct
      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      // authentication successful
      return user;
    }

    public void CreateProduct(Product product)
    {
      _repository.Find(u => u.Id == product.UserId, p => p.Products).Products.Add(product);
      _repository.Save();
    }

    public void CreateDiscount(Discount discount)
    {
      _repository.Find(u => u.Id == discount.UserId, d => d.Discounts).Discounts.Add(discount);
      _repository.Save();
    }

    public IList<Product> GetProducts(int userId)
    {
      return _productsRepository.Query(p => p.UserId == userId && !p.IsRemoved).OrderBy(o => o.Name).ToList();
    }

    public IList<Discount> GetDiscounts(int userId)
    {
      return _repository.Find(u => u.Id == userId, d => d.Discounts).Discounts.OrderBy(o => o.Name).ToList();
    }

    public User Create(User user, string password)
    {
      // validation
      if (string.IsNullOrWhiteSpace(password))
        throw new AppException("Password is required");

      if (_repository.Count(x => x.Login == user.Login || x.Email == user.Email) != 0)
        throw new AppException("Логини или Почта уже заняты!");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;
      user.StoreInfo = new Store
      {
        ActivationEnd = DateTime.Now,
        Name = $"{user.Login}{DateTime.Now.Millisecond}"
      };
      _repository.Add(user);

      return user;
    }
    public void UpdateProduct(Product product, int done)
    {
      var old = _productsRepository.Query(p => p.Id == product.Id).AsNoTracking().SingleOrDefault();
      if (old?.Price != product.Price)
        throw new AppException($"Есть записи {done} шт., нельзя обновить цену!");
      _productsRepository.Update(product);
      //_repository.Save();
    }

    public void UpdateDiscount(Discount discount)
    {
      _discountsRepository.Update(discount);
      // _repository.Save();
    }

    public void CreateOutgoing(Outgoing outgoing)
    {
      _outgoingsRepository.Add(outgoing);
      //_outgoingsRepository.Save();
    }

    public void UpdateOutgoing(int userId, Outgoing outgoing)
    {
      var exist = _outgoingsRepository.Count(o => o.Id == outgoing.Id && o.UserId == userId) == 1 ? true : false;
      if (!exist)
        throw new AppException("Вам нельзя обновить расход!");
      outgoing.UserId = userId;
      _outgoingsRepository.Update(outgoing);
      //_outgoingsRepository.Save();
    }

    public void DeleteOutgoing(int userId, int outgoingId)
    {
      var outgoing = _outgoingsRepository.Query(o => o.UserId == userId && o.Id == outgoingId).SingleOrDefault();
      if (outgoing == null)
        throw new AppException("Расход не найден!");
      _outgoingsRepository.Remove(outgoingId);
      //_outgoingsRepository.Save();
    }

    public IList<Outgoing> GetOutgoings(int userId, DateTime begin, DateTime end)
    {
      return _outgoingsRepository.Query(
         outgoing => outgoing.UserId == userId &&
         outgoing.Date >= begin.Date && outgoing.Date <= end.Date
        )
        .OrderByDescending(o => o.Date)
        .ToList();
    }

    public IList<Message> GetMessages(int userId)
    {
      return _repository.Find(u => u.Id == userId, m => m.Messages).Messages.OrderByDescending(o => o.Date).ToList();
    }

    public void AddMessage(Message message, string storeName)
    {
      message.Date = DateTime.Now;
      if (storeName != null)
      {
        var userId = _repository.Query(
          u => u.StoreInfo.Name == storeName
          )
          .Include(u => u.StoreInfo)
          .SingleOrDefault()?
          .Id;
        if (userId == null)
          throw new AppException("Магазин не найден!");
        message.Type = 2;
        var user =_repository.Find(u => u.Id == userId, m => m.Messages);
        user.Messages.Add(message);
        _repository.Save();
      }
      else
      {
        _repository.Find(u => u.Id == message.UserId, m => m.Messages).Messages.Add(message);
        _repository.Save();
      }
    }

    public IList<MonthReport> GenerateOutgoingsReport(int userId, DateTime dateStart, DateTime dateEnd)
    {
      return _repository.Find(u => u.Id == userId, o => o.Outgoings).Outgoings
        .Where(outgoing =>
         outgoing.Date >= dateStart.Date && outgoing.Date <= dateEnd.Date
         )
        .Select(
        field => new
        {
          Total = field.Total,
          Date = field.Date
        })
        .GroupBy(g => new
        {
          Y = g.Date.Year,
          M = g.Date.Month,
          MonthNumber = g.Date.Month,
          Month = $"{g.Date:MMM}"
        }
        )
        .Select(rep =>
         new MonthReport
         {
           Year = rep.Key.Y,
           Month = rep.Key.Month,
           MonthNumber = rep.Key.MonthNumber,
           Outgoings = rep.Sum(s => s.Total)
         }
        )
        //.OrderBy(m => m.Year)
        .ToList();
    }

    public void SetMessageAsRead(int userId, int messageId)
    {
      var message = _repository.Find(u => u.Id == userId, m => m.Messages).Messages
        .FirstOrDefault(m => m.Id == messageId);
      if (message == null)
        throw new AppException("Сообщение не найдено!");
      message.IsRead = true;
      _repository.Save();
    }

    public int GetCountUnreadMessages(int userId)
    {
      //return _repository.Find(u => u.Id == userId, m => m.Messages).Messages.Count(c => c.IsRead != true);
      return _messagesRepository.Count(messages => messages.UserId == userId && messages.IsRead != true);
    }

    public User GetUserInfo(int userId)
    {
      //return
      var user = _repository
        .Query(u => u.Id == userId)
        .Include(u=>u.StoreInfo)
        .SingleOrDefault()
        ;
      //_repository.
      //var balance = getUserBalance(userId);
      //user.BonusBalance = balance;
      return user;
    }

    public void UpdateUserPassword(int userId, string password)
    {
      if (string.IsNullOrWhiteSpace(password))
        throw new AppException("Пароль содержит пробелы!");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      var user = _repository.Find(u => u.Id == userId);
      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      _repository.Save();
    }

    public void SetPhotoFlag(int userId, int productId)
    {
      var product = _productsRepository.Find(p => p.UserId == userId && p.Id == productId);
      if (product == null)
        throw new Exception($"Услуга или товар не найдены.");
      product.HasPhoto = true;
      _productsRepository.Save();
    }

    public void SetPhotoFlag(int userId)
    {
      var user = _repository.Find(u => u.Id == userId);
      if (user == null)
        throw new Exception($"Пользователь не найден.");
      user.HasPhoto = true;
      _repository.Save();
    }

    public void SetAsRemovedProduct(int userId, int productId)
    {
      var product = _productsRepository.Find(p => p.UserId == userId && p.Id == productId);
      if (product == null)
        throw new Exception($"Услуга или товар не найдены.");
      product.Name += $"[до {DateTime.Now.Date:d}]";
      product.IsRemoved = true;
      _productsRepository.Save();
    }

    public bool IncomeBonus(int userId, int type, decimal total, int limit)
    {
      try
      {
        var user = _repository.Find(u => u.Id == userId);

        if (user.BonusBalance + total > 50)
          return false;
        var count = _bonusRepository.Count(b => b.UserId == userId && b.TypeId == type && b.Date.Date == DateTime.Now.Date);

        if (count >= limit)
          return false;

        var bonus = new BonusIncome
        {
          Total = total,
          TypeId = type,
          UserId = userId,
          Date = DateTime.Now
        };
        _bonusRepository.Add(bonus);

        user.BonusBalance += total;

        _repository.Save();

        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    private decimal getUserBalance(int userId)
    {
      return _repository.Query(u => u.Id == userId)
          .Select(user => new
          {
            Total = user.BonusBalance
          }).Single().Total;
      //return _repository.Query(u => u.Id == userId)
      //  .Include(u => u.BonusIncomes).Single().BonusIncomes.Sum(b => b.Total);
    }

    public void Confirm(string userLogin)
    {
      var user = _repository.Find(u => u.Login == userLogin);
      if (user == null)
        throw new AppException("Пользователь не найден!");
      user.Activated = true;
      _repository.Save();
    }
    //private void updateUserBalance(int userId)
    //{
    //  var user = _repository.Find(u => u.Id == userId);
    //  var balance = 
    //}
  }
}
