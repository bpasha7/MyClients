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

    [HttpPost("outgoing")]
    public IActionResult CreateOutgoing([FromBody]OutgoingDto outgoingDto)
    {
      try
      {
        var outgoing = _mapper.Map<Outgoing>(outgoingDto);

        if (outgoing == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        outgoing.UserId = userId;

        _userService.CreateOutgoing(outgoing);
        return Ok(new
        {
          Message = "Расход добавлен!",
          OutgoingId = outgoing.Id
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

    [HttpPut("outgoing")]
    public IActionResult UpdateOutgoing([FromBody]OutgoingDto outgoingDto)
    {
      try
      {
        var outgoing = _mapper.Map<Outgoing>(outgoingDto);

        if (outgoing == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        //if(outgoing.UserId != userId)
        //  throw new AppException("Вам нельзя обновить расход!");

        _userService.UpdateOutgoing(userId, outgoing);
        return Ok(new
        {
          Message = "Расход обновлен!",
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

    [HttpDelete("outgoing/{id}")]
    public IActionResult DeleteOutgoing(int id)
    {
      try
      {

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _userService.DeleteOutgoing(userId, id);

        return Ok(new
        {
          Message = "Расход удален!",
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

    [HttpGet("outgoings/report")]
    public IActionResult GetOutgoings([FromQuery]DateTime begin, [FromQuery]DateTime end)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        end = end.AddDays(1);
        var outgoings = _userService.GetOutgoings(userId, begin, end);
        return Ok(new
        {
          Outgoings = _mapper.Map<OutgoingDto[]>(outgoings)
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
