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
using AutoMapper;
using MyClientsBase.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Data.DTO.Entities;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;

namespace XUnitTest
{
    public class UserControllerTest
    {

    //    private Mock<IUserService> _moqUserService;
    //    private readonly Mock<IOrderService> _moqOrderService = new Mock<IOrderService>();
    //    private readonly Mock<IBonusService> _moqBonusService = new Mock<IBonusService>();
    //    private readonly Mock<IMapper> _moqMapper = new Mock<IMapper>();
    //    private readonly Mock<IOptions<AppSettings>> _moqAppSettings = new Mock<IOptions<AppSettings>>();
    //    private readonly Mock<ILoggerFactory> _moqLogger = new Mock<ILoggerFactory>();

    //    private UsersController _usersController;

    //    public UserControllerTest()
    //    {
    //        //var mockRepo = new Mock<IUserService>();
    //        //mockRepo.Setup(repo => repo.Authenticate("", "")).Returns(new User());
    //        var connection = "CharSet=utf8;server=localhost;port=3306;database=test;user=root;SslMode=none;";
    //        var dbOption = new DbContextOptionsBuilder<ApplicationDbContext>()
    //        .UseMySQL(connection, b => b.MigrationsAssembly("MyClientsBase"))
    //        .Options;
    //        var _context = new ApplicationDbContext(dbOption);
    //        //_moqUserService = new Mock<IUserService>(_context);
    //        //var _userService = new UserService(_context);
    //        //_moqAppSettings.Setup()
    //        //var logger = new Mock<ILogger>();

    //        //var loggerService = new Mock<ILoggerService>();
    //        //loggerService.Setup(c => c.GetLog(It.IsAny<object>())
    //        //     .Returns(logger.Object);
    //        //var uservice = new Mock<IUserService>();
    //        //_moqUserService = new Mock<IUserService>();
    //        //_moqUserService.Setup(s => s.GetDiscounts(1))
    //        //    .Returns(uservice.Object);
    //        var logger = new Mock<ILogger>();

    //        //var loggerService = new Mock<ILoggerFactory>();
    //        //loggerService.Setup(c => c.)
    //        //     .Returns(logger.Object);
    //       /// _usersController = new UsersController(_moqBonusService.Object, _userService, _moqOrderService.Object, _moqMapper.Object, _moqAppSettings.Object, _moqLogger.Object);
    //        //actionResult.ExecuteResultAsync()
    //    }
    //    [Fact]
    //    public void ExistedUserAuthenticationTest()
    //    {
    //        var user = new UserDto
    //        {
    //            Login = "test",
    //            Password = "test12345"
    //        };

    //        //Act
    //        var actionResult = _usersController.Authenticate(user);

    //        var okResult = actionResult.Should().BeOfType<BadRequestResult>();
    //        //OkResult result = null;
    //        //Assert
    //        // var r = actionResult as OkResult;//<ClientDto>;
    //        //r.
    //        //var contentResult = actionResult as OkNegotiatedContentResult<>;
    //        //Assert.NotNull(actionResult);
    //        // var result = Assert.IsType<OkResult>(actionResult);
    //        //if (actionResult is OkResult)
    //        //    result = actionResult as OkResult;
    //        //Assert.Equal(result)

    //        //var contextResult = actionResult as
    //    }
    }
}
