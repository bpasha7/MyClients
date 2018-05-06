using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    public class OrderPrepayment : IEntity<int>
    {
        [Key]
        public int Id { get; set; }
        public decimal Total { get; set; }
        public int OrderId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        /// <summary>
        /// Order
        /// </summary>
        [ForeignKey("OrderId")]
        public virtual Order OrderInfo { get; set; }
    }
}
