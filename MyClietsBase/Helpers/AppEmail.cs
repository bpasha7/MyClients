using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MyClientsBase.Helpers
{
  public class AppEmail
  {
    private SmtpServer _server;
    public AppEmail(SmtpServer server)
    {
      _server = server;
    }
    /// <summary>
    /// Send text email
    /// </summary>
    /// <param name="email"></param>
    /// <param name="text"></param>
    /// <param name="subject"></param>
    /// <param name="isHtml"></param>
    /// <returns></returns>
    public string Send(string email, string text, string subject, bool isHtml = false)
    {
      try
      {
        var client = new SmtpClient(_server.Host, _server.Port);
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential(_server.Account, _server.Password);
        MailMessage message = new MailMessage(_server.Account, email);
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
