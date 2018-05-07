using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    public class OrderItem : IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Product
        /// </summary>
        [ForeignKey("ProductId")]
        public virtual Product ProductInfo { get; set; }
        public int? ProductId { get; set; }

        /// <summary>
        /// Order
        /// </summary>
        [ForeignKey("OrderId")]
        public virtual Order OrderInfo { get; set; }
        public int? OrderId { get; set; }
    }
}
