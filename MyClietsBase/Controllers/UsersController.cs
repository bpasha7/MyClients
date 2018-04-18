using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyClientsBase.Helpers;
using MyClientsBase.Services;
using Microsoft.AspNetCore.Cors;

namespace MyClientsBase.Controllers
{
  /// <summary>
  /// User Controller
  /// </summary>
  [Authorize]
  [EnableCors("MyPolicy")]
  [Produces("application/json")]
  [Route("api/Users")]
  public partial class UsersController : Controller
  {
    /// <summary>
    /// User Servise to work with database
    /// </summary>
    private IUserService _userService;
    /// <summary>
    /// Order Servise to work with database
    /// </summary>
    private IOrderService _orderService;
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

    public UsersController(IUserService userService, IOrderService orderService, IMapper mapper, IOptions<AppSettings> appSettings, ILoggerFactory loggerFactory)
    {
      try
      {
        _userService = userService;
        _orderService = orderService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
        _logger = loggerFactory.CreateLogger(typeof(UsersController));
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
      }
    }

    [HttpPost("order")]
    public IActionResult CreateOrder([FromBody]OrderDto ordertDto)
    {
      try
      {
        var order = _mapper.Map<Order>(ordertDto);

        if (order == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        order.UserId = userId;

        _userService.CreateOrder(order);
        return Ok(new
        {
          Message = "Запись добавлена!"
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

    [HttpPatch("order/{id}")]
    public IActionResult SetOrdersAsRemoved(int id)
    {
      try
      {

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _orderService.SetAsRemoved(userId, id);
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
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpGet("orders/current")]
    public IActionResult GetCurrentOrders()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var orders = _userService.GetCurrentOrders(userId);
        var feature = orders.Where(o => o.Date.Date > DateTime.Now.Date).OrderBy(d=>d.Date);
        var current = orders.Where(o => o.Date.Date == DateTime.Now.Date).OrderBy(d => d.Date);
        return Ok(new
        {
          Feature = _mapper.Map<OrderDto[]>(feature),
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

    [HttpGet("orders/report")]
    public IActionResult GetOrdersReport([FromQuery]DateTime start, [FromQuery]DateTime end)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        //var orders =
        var report = _orderService.GenerateProductReport(userId, start, end);
        return Ok(new
        {
          Report = report
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
    //// GET: api/Users
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    //// GET: api/Users/5
    //[HttpGet("{id}", Name = "Get")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    /// <summary>
    /// User Authentication
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns>Users properties or bad request with text message</returns>
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody]UserDto userDto)
    {
      try
      {
        _logger.LogInformation($"Start Logining");
        var user = _userService.Authenticate(userDto.Login, userDto.Password);

        if (user == null)
          throw new AppException("Неверный логин-пароль!");
        var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
               };
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appSettings.Secret);
        //var tokenDescriptor = new JwtSecurityToken(
        //  "http://localhost:4200/",
        //  _appSettings.IsUser,
        //  claims,
        //  expires: DateTime.Now.AddMinutes(30),
        //  signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        //  );
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, user.Login),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            }),
          //Audience = _appSettings.IsUser,
          //Issuer = _appSettings.IsUser,
          Expires = DateTime.UtcNow.AddDays(_appSettings.PassDaysExpired),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };
        //new JwtSecurityTokenHandler().WriteToken(tokenDescriptor); 
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        var hash = AppFileSystem.GetUserMD5(user.Id, user.Login);
        _logger.LogInformation($"User #{user.Id} was logged.");
        return Ok(new
        {
          Token = tokenString,
          Hash = hash
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
    [HttpPost]
    [HttpPost("register")]
    public IActionResult Register([FromBody]UserDto userDto)
    {
      User user = _mapper.Map<User>(userDto);

      try
      {
        _userService.Create(user, userDto.Password);
        return Ok();
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(ex.Message);
      }
      catch(Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest("Service error!");
      }
    }
  }
}
