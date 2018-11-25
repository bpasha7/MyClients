using System;

namespace Data.Notifications
{
    public class DailyOrdersNotification
    {
        public long ChatId { get; set; }
        public int OrdersCount { get; set; }
        public string Message { get
            {
                if (OrdersCount == 0)
                    return $"Завтра ничего не намечается.";
                else
                    return $"Завтра что-то намечается. Зайдите в <a href='http://my.bizmak.ru/orders'>планы</a>.";
            }
        }
    }
}
