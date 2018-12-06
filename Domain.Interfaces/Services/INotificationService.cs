using Domain.Interfaces.Notifications;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface INotificationService
    {
        Task SendTelegramNotification(long id, string text);
        Task SendTelegramNotifications(IList<INotification> chatMessages);
        Task DailyNotification();
    }
}
