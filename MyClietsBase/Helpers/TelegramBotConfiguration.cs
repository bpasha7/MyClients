using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyClientsBase.Helpers
{
  public class TelegramBotConfiguration
  {
    public string BotToken { get; set; }

    public string Socks5Host { get; set; }

    public int Socks5Port { get; set; }
  }
}
