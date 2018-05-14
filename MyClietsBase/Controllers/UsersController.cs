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
using Data.Reports;
using System.Collections.Generic;

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
        _logger.LogCritical($"{ex}");
      }
    }

    [AllowAnonymous]
    [HttpPost("message")]
    public IActionResult CreateMessage([FromBody]MessageDto messageDto)
    {
      try
      {
        var message = _mapper.Map<Message>(messageDto);

        if (message == null)
          throw new AppException("Неверный данные!");
        if (message.UserId == null)
          throw new AppException("Неверный данные!");

        _userService.AddMessage(message);
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
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }


    [HttpPatch("message/{id}")]
    public IActionResult SetMessageAsRead(int id)
    {
      try
      {

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _userService.SetMessageAsRead(userId, id);
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

    [HttpGet("messages/unread")]
    public IActionResult GetCountUnreadMessages()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var messagesCount = _userService.GetCountUnreadMessages(userId);
        return Ok(new
        {
          Unread = messagesCount,
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

    [HttpGet("messages")]
    public IActionResult GetMessages()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var messages = _userService.GetMessages(userId);
        return Ok(new
        {
          Messages = _mapper.Map<MessageDto[]>(messages),
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

    [HttpGet("report")]
    public IActionResult GetOrdersReport([FromQuery]DateTime begin, [FromQuery]DateTime end)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        List<MonthReport> monthOrdersReport = null;
        end = end.AddDays(1);
        var productsReport = _orderService.GenerateProductReport(userId, begin, end, out monthOrdersReport);
        var outgoingsMonth = _userService.GenerateOutgoingsReport(userId, begin, end);

        var dict = monthOrdersReport.ToDictionary(p => $"{p.Year}-{p.Month}");
        string key = "";
        foreach (var item in outgoingsMonth)
        {
          key = $"{item.Year}-{item.Month}";
          if (dict.ContainsKey(key))
            dict[key].Outgoings = item.Outgoings;
          else
            dict.Add(key, item);
        }

        return Ok(new
        {
          Report = productsReport,
          MonthReport = dict.Values.OrderBy(o => o.MonthNumber / 10.0 + o.Year).ToList()
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
    // GET: api/Users
    [HttpGet]
    public IActionResult Get()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        if(userId < 1)
          throw new AppException("Неверный данные!");
        var user = _userService.GetUserInfo(userId);
        return Ok(new
        {
          User = _mapper.Map<UserDto>(user),
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

    [HttpPatch("password")]
    public IActionResult Get([FromBody] string password)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        if (userId < 1)
          throw new AppException("Неверный данные!");

        _userService.UpdateUserPassword(userId, password);

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
        _logger.LogCritical($"{ex}");
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

        _logger.LogInformation($"New User #{user.Id}");


        return Ok(new
        {
          Message = "Учетная запиь создана."
        }
      );
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(ex.Message);
      }
      catch(Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }
  }
}
