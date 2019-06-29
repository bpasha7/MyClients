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
  public class BackgroundService : IHostedService, IDisposable
  {
    private readonly ITelegramBotService _telegramService;
    private ILogger _logger;
    private readonly CancellationTokenSource _stoppingCts = new CancellationTokenSource();


    public BackgroundService(ITelegramBotService telegramService, ILoggerFactory loggerFactory)
    {
      _telegramService = telegramService;
      _logger = loggerFactory.CreateLogger(typeof(BackgroundService));
    }

    public void Dispose()
    {
      _logger.LogInformation("Dispose BackgroundService");
      _stoppingCts.Cancel();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Start BackgroundService");
      _telegramService?.Start();
      return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Stop BackgroundService");
      _telegramService?.Stop();
      return Task.CompletedTask;
    }
  }
}
