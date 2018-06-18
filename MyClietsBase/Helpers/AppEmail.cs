using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MyClientsBase.Helpers
{
  public static class AppEmail
  {
    /// <summary>
    /// Smtp Port
    /// </summary>
    public static int Port { get; set; }
    /// <summary>
    /// Smtp host
    /// </summary>
    public static string Host { get; set; }
    /// <summary>
    /// Send text email
    /// </summary>
    /// <param name="email"></param>
    /// <param name="text"></param>
    /// <param name="subject"></param>
    /// <param name="isHtml"></param>
    /// <returns></returns>
    public static string Send(string email, string text, string subject, bool isHtml)
    {
      try
      {
        var client = new SmtpClient(Host, Port);
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential("username", "password");


        MailMessage message = new MailMessage("info.bizmak.ru", email);//bezruk@maltat.ru nussvn@maltat.ru|melnikova-ep@primorsk.maltat.ru
        message.Subject = subject;
        message.Body = text;
        message.SubjectEncoding = System.Text.Encoding.UTF8;
        message.IsBodyHtml = isHtml;
         
        client.SendAsync(message, "test");
        return "";
      }
      catch(Exception ex)
      {
        return ex.ToString();
      }

    }
  }
}
