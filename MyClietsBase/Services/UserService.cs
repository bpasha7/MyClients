using Data.EF;
using Data.EF.Entities;
using Data.EF.UnitOfWork;
using Domain.Interfaces.Repositories;
using MyClientsBase.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
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
  }
  public class UserService : IUserService
  {
    private UnitOfWork _unitOfWork;
    /// <summary>
    /// User repository
    /// </summary>
    private IRepository<User> _repository;

    public UserService(ApplicationDbContext context)
    {
      _unitOfWork = new UnitOfWork(context);
      _repository = _unitOfWork.EfRepository<User>();
    }

    public User Authenticate(string login, string password)
    {
      if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
        return null;

      var user = _repository.Find(x => x.Login == login);

      // check if username exists
      if (user == null)
        return null;

      // check if password is correct
      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      // authentication successful
      return user;
    }

    public User Create(User user, string password)
    {
      // validation
      if (string.IsNullOrWhiteSpace(password))
        throw new AppException("Password is required");

      if (_repository.Count(x => x.Login == user.Login) != 0)
        throw new AppException("Login " + user.Login + " is already taken!");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;
      _repository.Add(user);

      return user;
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
  }
}
