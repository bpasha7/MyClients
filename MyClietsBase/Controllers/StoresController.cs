using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data.DTO.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyClientsBase.Helpers;
using MyClientsBase.Services;

namespace MyClientsBase.Controllers
{
  [AllowAnonymous]
  [Produces("application/json")]
  [Route("api/Stores")]
  public class StoresController : Controller
  {
    /// <summary>
    /// Store Servise to work with database
    /// </summary>
    private IStoreService _storeService;
    /// <summary>
    /// Mapper
    /// </summary>
    private IMapper _mapper;
    /// <summary>
    /// Application settings. appSettrings.json
    /// </summary>
    private readonly AppSettings _appSettings;
    /// <summary>
    /// Logger
    /// </summary>
    private ILogger _logger;

    public StoresController(IStoreService storeService, IUserService userService, IOrderService orderService, IMapper mapper, IOptions<AppSettings> appSettings, ILoggerFactory loggerFactory)
    {
      try
      {
        _storeService = storeService;

        _mapper = mapper;
        _appSettings = appSettings.Value;
        _logger = loggerFactory.CreateLogger(typeof(UsersController));
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
      }
    }

    // GET: api/Stores/storeName
    [HttpGet("{storeName}", Name = "GetStore")]
    public IActionResult Get(string storeName)
    {
      try
      {
        var store = _storeService.GetStore(storeName);
        if (store == null)
          throw new AppException("Витрина недоступна!");
        var products = store.UserInfo.Products;
        var hash = AppFileSystem.GetUserMD5(store.UserInfo.Id, store.UserInfo.Login);
        return Ok(new
        {
           Store = _mapper.Map<StoreDto>(store),
           Products = _mapper.Map<ProductDto[]>(products),
           Hash = hash
          //History = _mapper.Map<BonusIncomeDto[]>(history),
          //Types = bonusTypes
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    //// GET: api/Stores
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}



    //// POST: api/Stores
    //[HttpPost]
    //public void Post([FromBody]string value)
    //{
    //}

    //// PUT: api/Stores/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody]string value)
    //{
    //}

    //// DELETE: api/ApiWithActions/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
  }
}
