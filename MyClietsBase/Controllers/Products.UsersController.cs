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
  public partial class UsersController : Controller
  {
    [HttpPost("product")]
    public IActionResult CreateProduct([FromBody]ProductDto productDto)
    {
      try
      {
        var product = _mapper.Map<Product>(productDto);

        if (product == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        product.UserId = userId;

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

    [HttpGet("products")]
    public IActionResult GetProducts()
    {
      try
      {

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var products = _userService.GetProducts(userId);
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

    [HttpPut("product")]
    public IActionResult UpdateProducts([FromBody]ProductDto productDto)
    {
      try
      {
        var product = _mapper.Map<Product>(productDto);

        if (product == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (product.UserId != userId)
          throw new AppException("Вам нельзя обновить услугу!");

        _userService.UpdateProduct(product);

        return Ok(new
        {
          Message = "Услуга обновлена!"
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
  }
}
