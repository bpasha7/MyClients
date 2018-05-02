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
          Message = "Запись добавлена!",
          OrderId = order.Id
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

    [HttpPut("order")]
    public IActionResult UpdateOrder([FromBody]OrderDto orderDto)
    {
      try
      {
        var order = _mapper.Map<Order>(orderDto);

        if (order == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (order.UserId != userId)
          throw new AppException("Вам нельзя обновить услугу!");

        _orderService.Update(order);

        return Ok(new
        {
          Message = "Заказ обновлен!"
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

    [HttpPatch("order/{id}")]
    public IActionResult SetOrdersAsRemoved(int id)
    {
      try
      {

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _orderService.ChangeStatus(userId, id);
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

    [HttpGet("orders/current")]
    public IActionResult GetCurrentOrders()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        var orders = _userService.GetCurrentOrders(userId);
        var feature = orders.Where(o => o.Date.Date > DateTime.Now.Date).OrderBy(d => d.Date);
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
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }
  }
}
