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
using System.IO;
using System.Security.Claims;

namespace MyClientsBase.Controllers
{
  [Authorize]
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
        _logger.LogCritical($"{ex}");
      }
    }
    /// <summary>
    /// Creating new client
    /// </summary>
    /// <param name="clientDto"></param>
    /// <returns></returns>
    [HttpPost("create")]
    public IActionResult Create([FromBody]ClientDto clientDto)
    {
      try
      {
        var client = _mapper.Map<Client>(clientDto);

        if (client == null)
          throw new AppException("Не удалось создать нового клиента!");
        client.Birthday = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Parse(clientDto.Birthday.ToString()), "Pacific Standard Time", "UTC");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (userId <= 0)
          throw new AppException("Запрещено создать нового клиента!");

        client.UserId = userId;

        _clientService.Create(client);

        _logger.LogInformation($"User #{userId}, CreateClient #{client.Id}");


        return Ok(new
        {
          Message = "Клиент добавлен!",
          ClientId = client.Id
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
    /// <summary>
    /// 
    /// </summary>
    /// <param name="clientDto"></param>
    /// <returns></returns>
    [HttpPut("update")]
    public IActionResult UpdateClient([FromBody]ClientDto clientDto)
    {
      try
      {
        var client = _mapper.Map<Client>(clientDto);

        if (client == null)
          throw new AppException("Не удалось обновить клиента!");
        client.Birthday = clientDto.Birthday.ToLocalTime();
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (client.UserId != userId)
          throw new AppException("Запрещено обновить клиента!");

        _logger.LogInformation($"User #{userId}, UpdateClient #{client.Id}");


        _clientService.Update(client);
        return Ok(new
        {
          Message = "Данные клиента обновлены!"
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

    /// <summary>
    /// Get all clients
    /// </summary>
    /// <returns></returns>
    // GET: api/Clients
    [HttpGet]
    public IActionResult Get()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, GetClients");


        var clients = _clientService.GetClients(userId);

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
        _logger.LogCritical($"{ex}");
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
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var client = _clientService.Get(userId, id);
        if (client == null)
          throw new AppException("Клиент не найден в базе!");

        _logger.LogInformation($"User #{userId}, GetClient #{client.Id}");


        var old = client.Orders.Where(o => o.Date < DateTime.Now.Date).OrderByDescending(o => o.Date).ToList();
        var current = client.Orders.Where(o => o.Date >= DateTime.Now.Date).OrderBy(o => o.Date).ToList();
        return Ok(new
        {
          Client = _mapper.Map<ClientDto>(client),
          Orders = new
          {
            Old = _mapper.Map<OrderDto[]>(old),
            Current = _mapper.Map<OrderDto[]>(current)
          }
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

    [HttpGet("{id}/orders")]
    public IActionResult GetOrders(int id)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        _logger.LogInformation($"To Delete");

        var orders = _clientService.GetOrders(userId, id);
        var old = orders.Where(o => o.Date < DateTime.Now.Date).ToList();
        var current = orders.Where(o => o.Date >= DateTime.Now.Date).ToList();
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
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpPost, DisableRequestSizeLimit, Route("{id}/photo")]
    public async Task<IActionResult> UploadFile(int id)
    {
      try
      {
        var file = Request.Form.Files.FirstOrDefault();
        if (file == null)
          throw new AppException("Empty file!");
        if (file.Length > _appSettings.MaxImageSize * 1024)
          throw new AppException("Слишком большое изображени");
        //combine path to user folder using md5 hash
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, UploadClientPhoto #{id}");

        var userName = User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        var hash = AppFileSystem.GetUserMD5(userId, User.Identity.Name);
        //create directory in not exist
        var path = $"{Directory.GetCurrentDirectory()}{_appSettings.PhotoFolder}{hash}";
        if (!Directory.Exists(path))
          Directory.CreateDirectory(path);
        path += $"\\{id}";

        if (System.IO.File.Exists(path + ".jpg"))
          System.IO.File.Delete(path + ".jpg");
        using (FileStream fstream = new FileStream(path + ".new", FileMode.Create))
        {
          await file.CopyToAsync(fstream);
        }
        if (!AppFileSystem.CompressImage(path, _appSettings.PhotoSize))
        {
          _logger.LogError($"File {path} was not compressed and deleted!");
          throw new AppException("Ошибка загрузки файла.");
        }
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
