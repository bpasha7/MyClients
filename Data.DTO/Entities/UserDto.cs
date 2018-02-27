using Domain.Interfaces.Entities;
using System.ComponentModel.DataAnnotations;

namespace Data.DTO.Entities
{
    /// <summary>
    /// Пользователь (для передачи)
    /// </summary>
    public class UserDto : IEntity<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
