using Domain.Interfaces.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MyClientsBase.Services
{
  public class NotificationService : INotificationService
  {
    private readonly ITelegramBotService _telegramService;
    private ILogger _logger;


    public NotificationService(ITelegramBotService telegramService, ILoggerFactory loggerFactory)
    {
      _telegramService = telegramService;
      _logger = loggerFactory.CreateLogger(typeof(NotificationService));
    }

    public async Task DaylyNotification()
    {

    }

    public async Task SendTelegramNotification(long id, string text)
    {
      _logger.LogInformation("Sending Telegram notification");
      await _telegramService.SendMessage(id, text);
    }

    public async Task SendTelegramNotifications(IDictionary<long, string> chatMessages)
    {
      _logger.LogInformation($"Sending Telegram {chatMessages.Count}notifications");
      await _telegramService.SendMessages(chatMessages);
    }

  }
}
