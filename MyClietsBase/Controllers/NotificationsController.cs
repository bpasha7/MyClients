using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyClientsBase.Controllers
{
  [AllowAnonymous]
  [Produces("application/json")]
  [Route("api/Notifications")]
  public class NotificationsController : Controller
  {
    /// <summary>
    /// Notification service
    /// </summary>
    private INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService)
    {
      _notificationService = notificationService;
    }

    [AllowAnonymous]
    [HttpPost("daily")]
    public async Task<IActionResult> SendDailyNotifications([FromQuery]string who)
    {
      try
      {
        await _notificationService.DailyNotification();
        return Ok(new
        {
        });
      }
      catch(Exception ex)
      {
        return BadRequest(ex.ToString());
      }

    }
  }
}
