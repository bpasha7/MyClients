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

    [HttpPost("discount")]
    public IActionResult CreateDiscount([FromBody]DiscountDto discountDto)
    {
      try
      {
        var discount = _mapper.Map<Discount>(discountDto);

        if (discount == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        discount.UserId = userId;

        discount.Percent /= 100;
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

    [HttpGet("discounts")]
    public IActionResult GetDiscounts()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        var discounts = _userService.GetDiscounts(userId);
        return Ok(new
        {
          Discounts = _mapper.Map<DiscountDto[]>(discounts)
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
    [HttpPut("discount")]
    public IActionResult UpdateDiscount([FromBody]DiscountDto discountDto)
    {
      try
      {
        var discount = _mapper.Map<Discount>(discountDto);

        if (discount == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (discount.UserId != userId)
          throw new AppException("Вам нельзя обновить скидку!");

        discount.Percent /= 100;
        _userService.UpdateDiscount(discount);
        return Ok(new
        {
          Message = "Скидка обнавлена!"
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
