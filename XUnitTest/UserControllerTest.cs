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
    public class UserControllerTest
    {
        public UserControllerTest()
        {
            //var mockRepo = new Mock<IUserService>();
            //mockRepo.Setup(repo => repo.Authenticate("", ""));//.Returns(Task.FromResult());
            //var controller = new UsersController(mockRepo.Object);
        }
    }
}
