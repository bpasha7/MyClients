using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface ITelegramBotService
    {
        void Start();
        void Stop();
        Task SendMessage(long id, string text);
        Task SendMessages(IDictionary<long, string> chatMessages);
    }
}
