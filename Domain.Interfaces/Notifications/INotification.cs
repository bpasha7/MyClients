using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces.Notifications
{
    public interface INotification
    {
        long ChatId { get; set; }
        string Message { get; }
    }
}
