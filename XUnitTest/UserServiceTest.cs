using Data.EF;
using Data.EF.Entities;
using Domain.Interfaces.Repositories;
using Moq;
using MyClientsBase;
using MyClientsBase.Controllers;
using MyClientsBase.Services;
using System;
using System.Threading.Tasks;
using Xunit;
//
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using NetEscapades.AspNetCore.SecurityHeaders.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MyClientsBase.Helpers;

namespace XUnitTest
{
    public class UserServiceUnitTest
    {
        private DbContextOptions<ApplicationDbContext> _options;
        private ApplicationDbContext _context;
        private IUserService _service;

        private void refreshContext()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
              .UseInMemoryDatabase(databaseName: DateTime.Now.Millisecond.ToString())
              .Options;
            _context = new ApplicationDbContext(_options);
            _service = new UserService(_context);
        }
        //private User createNewUser()
        //{
        //    var user = new User
        //    {
        //        Login = "test",
        //        Name = "Test Test"
        //    };
        //}
        /// <summary>
        /// Test availible data for new user
        /// </summary>
        [Fact]
        public void RegisterNewUser()
        {
            refreshContext();
            var user = new User
            {
                Login = "test",
                Name = "Test Test"
            };
            var pass = "12345";
            _service.Create(user, pass);
            // Zero balance
            Assert.Equal(0, user.BonusBalance);
            // Has store
            Assert.NotNull(user.StoreInfo);
            // Not activated
            Assert.False(user.Activated);
            // Not comfired account
            try
            {
                _service.Authenticate(user.Login, pass);
            }
            catch(Exception ex)
            {
                Assert.Equal(typeof(AppException), ex.GetType());
            }
            // confirm
            _service.Confirm(user.Login);
            Assert.True(user.Activated);
            // try to get user data
            var res = _service.Authenticate(user.Login, pass);
            Assert.NotNull(res);
        }
    }
}
