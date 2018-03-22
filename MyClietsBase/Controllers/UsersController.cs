using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
  //[Authorize]
  [EnableCors("MyPolicy")]
  [Produces("application/json")]
  [Route("api/Users")]
  public class UsersController : Controller
  {
    /// <summary>
    /// User Servise to work with database
    /// </summary>
    private IUserService _userService;
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

    public UsersController(IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings, ILoggerFactory loggerFactory)
    {
      try
      {
        _userService = userService;
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
    [HttpPost("{id}/product")]
    public IActionResult CreateProduct(int id, [FromBody]ProductDto productDto)
    {
      try
      {
        var product = _mapper.Map<Product>(productDto);

        if (product == null)
          throw new AppException("Неверный данные!");

        product.UserId = id;
        _userService.CreateProduct(product);
        return Ok(new
        {
          Message = "Услуга добавлена!"
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
    [HttpPost("{id}/discount")]
    public IActionResult CreateDiscount(int id, [FromBody]DiscountDto discounttDto)
    {
      try
      {
        var discount = _mapper.Map<Discount>(discounttDto);

        if (discount == null)
          throw new AppException("Неверный данные!");

        discount.UserId = id;
        _userService.CreateDiscount(discount);
        return Ok(new
        {
          Message = "Скидка добавлена!"
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
    [HttpGet("{id}/discounts")]
    public IActionResult GetDiscounts(int id)
    {
      try
      {
        var discounts = _userService.GetDiscounts(id);
        return Ok(new
        {
          Discounts = discounts
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
    [HttpGet("{id}/products")]
    public IActionResult GetProducts(int id)
    {
      try
      {
        var products = _userService.GetProducts(id);
        //var t = _mapper.Map<Product[]>(products);
        return Ok(new
        {
          Products = _mapper.Map<ProductDto[]>(products)
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
        var user = _userService.Authenticate(userDto.Login, userDto.Password);

        if (user == null)
          throw new AppException("Неверный логин-пароль!");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
          Expires = DateTime.UtcNow.AddDays(_appSettings.PassDaysExpired),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);
        _logger.LogError($"User #{user.Id} was logged.");

        return Ok(new
        {
          Id = user.Id,
          Name = user.Name,
          Token = tokenString,
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

    //[AllowAnonymous]
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
