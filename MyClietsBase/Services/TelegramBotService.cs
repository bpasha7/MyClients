using Domain.Interfaces.Services;
using Microsoft.Extensions.Options;
using MyClientsBase.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;

namespace MyClientsBase.Services
{
  public class TelegramBotService : ITelegramBotService
  {
    private readonly TelegramBotConfiguration _config;
    private static TelegramBotClient _bot;

    public TelegramBotService(IOptions<TelegramBotConfiguration> config)
    {
      _config = config.Value;
      _bot = new TelegramBotClient(_config.BotToken);
      _bot.OnMessage += BotOnMessageReceived;
    }

    private async void BotOnMessageReceived(object sender, MessageEventArgs e)
    {
      var message = e.Message;
      if (message?.Type == MessageType.Text)
      {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{message.Chat.Id}");
        await _bot.SendTextMessageAsync(message.Chat.Id, $"Введите в личном кабинете <b>{Convert.ToBase64String(plainTextBytes)}</b>", ParseMode.Html );
      }
    }

    public async Task SendMessage(long id, string text)
    {
        await _bot.SendTextMessageAsync(id, text, ParseMode.Html);  
    }

    public async Task SendMessages(IDictionary<long, string> chatMessages)
    {
      foreach (var item in chatMessages)
      {
        await _bot.SendTextMessageAsync(item.Key, $"{item.Value}", ParseMode.Html);
      }
    }

    public void Start()
    {
      _bot.StartReceiving();
    }

    public void Stop()
    {
      _bot.StopReceiving();
    }

  }
}
