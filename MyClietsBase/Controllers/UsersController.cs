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
using MyClietsBase.Helpers;

namespace MyClietsBase.Controllers
{
  [Authorize]
  [Produces("application/json")]
  [Route("api/Users")]
  public class UsersController : Controller
  {
    //private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    private ILogger _logger;
    public UsersController(/*IUserService userService,*/ IMapper mapper, IOptions<AppSettings> appSettings, ILoggerFactory loggerFactory)
    {
      try
      {
        //_userService = userService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
        _logger = loggerFactory.CreateLogger(typeof(UsersController));
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
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
    /// Авторизация пользователя
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody]UserDto userDto)
    {
      try
      {
        /*var user = _userService.Authenticate(userDto.Username, userDto.Password);

        if (user == null)
          throw new AppException("Неверный логин-пароль!");//return Unauthorized();

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        _logger.LogError($"User #{user.Id} was logged.");
        // return basic user info (without password) and token to store client side*/
        return Ok(new
        {
          /*Id = user.Id,
          Username = user.UserName,
          Name = user.Name,
          Token = tokenString,
          City = user.CityInfo.Name,
          RoleId = user.RoleId,
          Lat = user.CityInfo.Lat,
          Lng = user.CityInfo.Lng*/
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogError($"{ex}");
        return BadRequest(ex.Message);
      }
    }

    //// PUT: api/Users/5
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
