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

namespace XUnitTest
{
    public class UserServiceTest
    {
        private readonly IUserService _userService;
        private ApplicationDbContext _context;
        private User _user;

        public UserServiceTest()
        {
            var connection = "server=localhost;port=3306;database=test;user=root;password=yeogl5W4pCBLHx8d;";
            var dbOption = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseMySQL(connection, b => b.MigrationsAssembly("MyClientsBase"))
            .Options;
            _context = new ApplicationDbContext(dbOption);
            _userService = new UserService(_context);
        }

        [Theory,
        InlineData("test", "test")]
        public void CorrectLoginPass(string login, string pass)
        {
            _user = _userService.Authenticate(login, pass);
            Assert.NotNull(_user);
            Assert.Equal(_user.Login, login);
        }

        [Theory,
        InlineData("test", "12345")]
        public void NotCorrectLoginPass(string login, string pass)
        {
            _user = _userService.Authenticate(login, pass);
            Assert.Null(_user);
        }
        /// <summary>
        /// Testing 
        /// </summary>
        /// <param name="testOwnerId">Test or owner user</param>
        [Theory,
        InlineData(1)]
        public void GetListOfCurrentOrders(int testOwnerId)
        {
            var orders = _userService.GetCurrentOrders(testOwnerId);
            Assert.NotNull(orders);
            Assert.True(orders.Count >= 0);
        }
    }
}
