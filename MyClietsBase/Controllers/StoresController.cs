using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyClientsBase.Helpers;
using MyClientsBase.Services;

namespace MyClientsBase.Controllers
{
  [Authorize]
  [EnableCors("MyPolicy")]
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
    [AllowAnonymous]
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
    [HttpPatch("prolong")]
    public IActionResult ProlongActivation([FromQuery]int storeId)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, Prolong store #{storeId}");
        var bonus = new BonusIncome
        {
          Total = _appSettings.Bonuses.Prolong,
          TypeId = _appSettings.BonusTypes.Prolong,
          UserId = userId,
          Date = DateTime.Now
        };
        decimal balance = 0;
        var res = _storeService.ProlongPeriond(userId, storeId, 10, bonus, out balance);

        return Ok(new
        {
          Date = res,
          Balance = balance
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
    [HttpPut]
    public IActionResult UpdateInfo([FromBody]StoreDto storeDto)
    {
      try
      {
        var store = _mapper.Map<Store>(storeDto);
        if (store == null)
          throw new AppException("Неверные данные!");
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, Update store info #{store.Id}");

        _storeService.UpdateInfo(userId, store);

        return Ok(new
        {
          
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

    //var product = _mapper.Map<Product>(productDto);

    //    if (product == null)
    //      throw new AppException("Неверный данные!");

    //var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

    //_logger.LogInformation($"User #{userId}, UpdateProduct #{product.Id}");


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
