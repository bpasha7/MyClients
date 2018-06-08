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
    public IActionResult CreateOrder([FromBody]OrderDto orderDto)
    {
      try
      {
        var order = _mapper.Map<Order>(orderDto);

        if (order == null || orderDto.ProductsId == null)
          throw new AppException("Неверный данные!");
        order.Date = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Parse(orderDto.Date.ToString()), "Pacific Standard Time", "UTC");
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        order.UserId = userId;
       
        if (orderDto.Prepay != 0)
        {
          order.Prepayment = new OrderPrepayment
          {
            Total = orderDto.Prepay,
            Date = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Parse(orderDto.DatePrepay.ToString()), "Pacific Standard Time", "UTC")
        };
        }

        if (order.DiscountId == 0)
        {
          order.DiscountId = null;
        }

        _orderService.CreateOrder(order, orderDto.ProductsId);

        _logger.LogInformation($"User #{userId}, CreateOrder #{order.Id}");

        var res = _userService
          .IncomeBonus(
          userId,
          _appSettings.BonusTypes.NewOrder,
          _appSettings.Bonuses.NewOrder,
          _appSettings.BonusLimitPerDay.NewOrder
          );

        if (res)
          _logger.LogInformation($"User #{userId}, {_appSettings.Bonuses.NewOrder} bonus incomes");

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

        if (order == null || orderDto.ProductsId == null)
          throw new AppException("Неверный данные!");
        order.Date = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Parse(orderDto.Date.ToString()), "Pacific Standard Time", "UTC");
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        if (order.UserId != userId)
          throw new AppException("Вам нельзя обновить услугу!");
        OrderPrepayment op = null;

        _logger.LogInformation($"User #{userId}, UpdateOrder #{order.Id}");


        if (orderDto.Prepay != 0)
        {
          op = new OrderPrepayment
          {
            Total = orderDto.Prepay,
            Date = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Parse(orderDto.DatePrepay.ToString()), "Pacific Standard Time", "UTC")
        };
          //order.Prepayment = op;
        }

        if(order.DiscountId == 0)
        {
          order.DiscountId = null;
        }

        _orderService.Update(order, op, orderDto.ProductsId);

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
        _logger.LogInformation($"User #{userId}, SetOrdersAsRemoved #{id}");
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
        _logger.LogInformation($"User #{userId}, GetCurrentOrders()");

        var orders = _orderService.GetCurrentOrders(userId);
        var feature = orders.Where(o => o.Date.Date > DateTime.Now.Date).OrderBy(d => d.Date);
        var current = orders.Where(o => o.Date.Date == DateTime.Now.Date).OrderBy(d => d.Date);
        return Ok(new
        {
          Feature = _mapper.Map<OrderInfoDto[]>(feature),
          Current = _mapper.Map<OrderInfoDto[]>(current)
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
