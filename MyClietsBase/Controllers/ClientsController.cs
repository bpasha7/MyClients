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

namespace MyClientsBase.Controllers
{
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

    // GET: api/Clients
    [AllowAnonymous]
    [HttpGet]
          public IEnumerable<string> Get()
          {
              return new string[] { "value1", "value2" };
          }

          /*/ GET: api/Clients/5
          [HttpGet("{id}", Name = "Get")]
          public string Get(int id)
          {
              return "value";
          }

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
