using Domain.Interfaces.Entities;
using System.ComponentModel.DataAnnotations;

namespace Data.EF.Entities
{
    public class User : IEntity<int>
    {
        public User() { }
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        //login-pass
        [Required]
        public string Login { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
    }
}
