using Domain.Interfaces.Entities;
using System;

namespace Data.DTO.Entities
{
    /// <summary>
    /// Пользователь (для передачи)
    /// </summary>
    public class UserDto
    {
        //public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Gmail { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public decimal BonusBalance { get; set; }
    }
}
