using Domain.Interfaces.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.EF.Entities
{
    /// <summary>
    /// Пользователь
    /// </summary>
    public class User : IEntity<int>
    {
        public User() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(128)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string Login { get; set; }
        [Column(TypeName = "VARBINARY(128)")]
        public byte[] PasswordHash { get; set; }
        [Column(TypeName = "VARBINARY(128)")]
        public byte[] PasswordSalt { get; set; }

        /// <summary>
        /// Clients
        /// </summary>
        public virtual ICollection<Client> Clients { get; set; }
    }
}
