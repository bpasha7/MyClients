using Domain.Interfaces.Entities;
using System;
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
        [MaxLength(50)]
        public string Gmail { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Birthday { get; set; }



        [Column(TypeName = "VARBINARY(128)")]
        public byte[] PasswordHash { get; set; }
        [Column(TypeName = "VARBINARY(128)")]
        public byte[] PasswordSalt { get; set; }


        /// <summary>
        /// Clients
        /// </summary>
        public virtual ICollection<Client> Clients { get; set; }
        /// <summary>
        /// Products
        /// </summary>
        public virtual ICollection<Product> Products { get; set; }
        /// <summary>
        /// Discounts
        /// </summary>
        public virtual ICollection<Discount> Discounts { get; set; }
        /// <summary>
        /// Orders
        /// </summary>
        public virtual ICollection<Order> Orders { get; set; }
        /// <summary>
        /// Orders
        /// </summary>
        public virtual ICollection<Message> Messages { get; set; }
        /// <summary>
        /// Orders
        /// </summary>
        public virtual ICollection<Outgoing> Outgoings { get; set; }
    }
}
