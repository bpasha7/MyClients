using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface INotificationService
    {
        Task SendTelegramNotification(long id, string text);
        Task SendTelegramNotifications(IDictionary<long, string> chatMessages);
    }
}
