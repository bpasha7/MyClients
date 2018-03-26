using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyClientsBase.Helpers;
using MyClientsBase.Services;
using Microsoft.AspNetCore.Cors;

namespace MyClientsBase.Controllers
{
  [EnableCors("MyPolicy")]
  [Produces("application/json")]
  [Route("api/Clients")]
  public class ClientsController : Controller
  {
    /// <summary>
    /// User Servise to work with database
    /// </summary>
    private IClientService _clientService;
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

    public ClientsController(IClientService clientService, IMapper mapper, IOptions<AppSettings> appSettings, ILoggerFactory loggerFactory)
    {
      try
      {
        _clientService = clientService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
        _logger = loggerFactory.CreateLogger(typeof(UsersController));
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
      }
    }
    /// <summary>
    /// Creating new client
    /// </summary>
    /// <param name="clientDto"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("create")]
    public IActionResult Create([FromBody]ClientDto clientDto)
    {
      try
      {
        var client = _mapper.Map<Client>(clientDto);

        if (client == null)
          throw new AppException("Не удалось создать нового клиента!");
        client.UserId = 1;
        _clientService.Create(client);
        return Ok(new
        {
          Message = "Клиент добавлен!"
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }
    /// <summary>
    /// Get all clients
    /// </summary>
    /// <returns></returns>
    // GET: api/Clients
    [AllowAnonymous]
    [HttpGet]
    public IActionResult Get()
    {
      try
      {
        var clients = _clientService.Get();
        return Ok(new
        {
          Clients = clients
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }
    /// <summary>
    /// Get client info
    /// </summary>
    /// <param name="id">user id</param>
    /// <returns></returns>
    // GET: api/Clients/5
    [HttpGet("{id}", Name = "Get")]
    public IActionResult Get(int id)
    {
      try
      {
        var client = _clientService.Get(id);
        return Ok(new
        {
          Client = client
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [AllowAnonymous]
    [HttpGet("{id}/orders")]
    public IActionResult GetOrders(int id)
    {
      try
      {
        var orders = _clientService.GetOrders(id);
        var old = orders.Where(o => o.Date < DateTime.Now).ToList();
        var current = orders.Where(o => o.Date >= DateTime.Now).ToList();
        return Ok(new
        {
          Old = _mapper.Map<OrderDto[]>(old),
          Current = _mapper.Map<OrderDto[]>(current)
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }

    /*    
              // POST: api/Clients
              [HttpPost]
              public void Post([FromBody]string value)
              {
              }

              // PUT: api/Clients/5
              [HttpPut("{id}")]
              public void Put(int id, [FromBody]string value)
              {
              }

              // DELETE: api/ApiWithActions/5
              [HttpDelete("{id}")]
              public void Delete(int id)
              {
              }*/
  }
}
