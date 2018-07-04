using Data.EF;
using Microsoft.EntityFrameworkCore;
using MyClientsBase.Helpers;
using MyClientsBase.Services;
using System;
using System.Collections.Generic;
using Xunit;
using Data.EF.Entities;
using System.Linq;

namespace XUnitTest
{
    public class StoreServiceUnitTest
    {
        private DbContextOptions<ApplicationDbContext> _options;
        private ApplicationDbContext _context;
        private IStoreService _service;

        private void refreshContext()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
              .UseInMemoryDatabase(databaseName: DateTime.Now.Millisecond.ToString())
              .Options;
            _context = new ApplicationDbContext(_options);
            _service = new StoreService(_context);
        }
        /// <summary>
        /// Add Bonus type
        /// </summary>
        /// <param name="id">Type Id</param>
        /// <param name="Name">Name</param>
        private void addBonusTypes(int id, string Name)
        {
            var bt = new BonusIncomeType
            {
                Id = id,
                Name = Name
            };
            _context.Add(bt);
            _context.SaveChanges();
        }
        /// <summary>
        /// Populate products for user
        /// </summary>
        /// <param name="user">User</param>
        private void populateProducts(User user)
        {
            var products = new List<Product>();
            Random gen = new Random();
            int count = gen.Next(100) + 20;
            for (int i = 0; i < count; i++)
            {
                products.Add(new Product
                {
                    Name = $"test_#{i}",
                    Show = i % 4 == 0 ? true : false,
                    IsRemoved = i % 3 == 0 ? true : false,
                });
            }
            user.Products = products;
            _context.SaveChanges();
        }
        /// <summary>
        /// Add user with store and bonuses
        /// </summary>
        /// <param name="balance">Bonus balance</param>
        private User addUserWithBonusesAndStore(decimal balance)
        {
            var user = new User
            {
                Name = "Test",
                BonusBalance = balance
            };
            user.StoreInfo = new Store
            {
                // UserId = 1,
                Name = "test",
                ActivationEnd = DateTime.Now
            };
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }
        /// <summary>
        /// Checking balance and date after succesfull prolong store period
        /// </summary>
        [Fact]
        public void ProlongStoreTest()
        {
            //Inserting data
            refreshContext();
            addBonusTypes(5, "Продление магазина.");
            var user = addUserWithBonusesAndStore(50);
            var bonus = new BonusIncome
            {
                Total = -30,
                TypeId = 5,
                UserId = user.Id,
                Date = DateTime.Now
            };
            //Save Values
            decimal balance, balanceBefore = user.BonusBalance;
            DateTime dateBefore = user.StoreInfo.ActivationEnd;
            //Action
            DateTime dateTo =_service.ProlongPeriond(user.Id, user.StoreInfo.Id, 10, bonus, out balance);
            //Asserts
            Assert.Equal(balance, balanceBefore + bonus.Total);
            Assert.Equal(dateTo, dateBefore.AddDays(10));
            Assert.True(user.StoreInfo.IsActive);
            //Save Values
            balance = balanceBefore = user.BonusBalance;
            dateBefore = user.StoreInfo.ActivationEnd;
            //Action
            try
            {
                dateTo = _service.ProlongPeriond(user.Id, user.StoreInfo.Id, 10, bonus, out balance);
            }
            //Asserts
            catch (AppException ex)
            {
                //Assert
                Assert.Equal("Недостаточно средств!", ex.Message);
            }
            Assert.Equal(balance, balanceBefore);
            Assert.Equal(dateTo, dateBefore);
            Assert.True(user.StoreInfo.IsActive);
        }
        /// <summary>
        /// Try to Prolong with no bonuses
        /// </summary>
        [Fact]
        public void ProlongStoreNoBonusesTest()
        {
            //Inserting data
            refreshContext();
            addBonusTypes(5, "Продление магазина.");
            var user = addUserWithBonusesAndStore(20);
            var bonus = new BonusIncome
            {
                Total = -30,
                TypeId = 5,
                UserId = user.Id,
                Date = DateTime.Now
            };
            //Save Values
            decimal balance, balanceBefore = user.BonusBalance;
            DateTime dateBefore = user.StoreInfo.ActivationEnd;
            bool activationBefore = user.StoreInfo.IsActive;
            //Action
            try
            {
                _service.ProlongPeriond(user.Id, user.StoreInfo.Id, 10, bonus, out balance);
            }
            //Asserts
            catch (AppException ex)
            {
                //Assert
                Assert.Equal("Недостаточно средств!", ex.Message);
            }
            Assert.Equal(user.BonusBalance, balanceBefore);
            Assert.Equal(user.StoreInfo.ActivationEnd, dateBefore);
            Assert.Equal(user.StoreInfo.IsActive, activationBefore);
        }

        [Fact]
        public void GetProducts()
        {
            //Inserting data
            refreshContext();
            addBonusTypes(5, "Продление магазина.");
            var user = addUserWithBonusesAndStore(50);
            populateProducts(user);
            try
            {
                _service.GetStore(user.StoreInfo.Name);
            }
            //Asserts
            catch (AppException ex)
            {
                //Assert
                Assert.Equal("Магазин не найден!", ex.Message);
            }
            var bonus = new BonusIncome
            {
                Total = -30,
                TypeId = 5,
                UserId = user.Id,
                Date = DateTime.Now
            };
            decimal balance = user.BonusBalance;
            _service.ProlongPeriond(user.Id, user.StoreInfo.Id, 10, bonus, out balance);
            var store = _service.GetStore(user.StoreInfo.Name);
            //Asserts
            Assert.Equal(
                user.Products.Count(p => p.Show && !p.IsRemoved),
                store.Products.Count
                );
        }
        /*
        [Fact]
        public async Task TestMethod1()
        {
            var webHostBuilder =
                  new WebHostBuilder()
                        .UseStartup<Startup>()
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Information);
            })
            .UseNLog();

            using (var server = new TestServer(webHostBuilder))
            using (var client = server.CreateClient())
            {

                var result = await client.GetAsync("/api/stores/test");
                var str = await client.GetStringAsync("/api/stores/test");
            }
        }*/
    }
}
