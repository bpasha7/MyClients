using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    public class Order : IEntity<int>
    {
        public Order() { }
        [Key]
        public int Id { get; set; }
        [Required]
        public decimal Total { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Commentary { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("ClientId")]
        public virtual Client ClientInfo { get; set; }
        public int? ClientId { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("ProductId")]
        public virtual Product ProductInfo { get; set; }
        public int? ProductId { get; set; }
    }
}
