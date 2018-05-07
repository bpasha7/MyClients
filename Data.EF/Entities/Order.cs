﻿using Domain.Interfaces.Entities;
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
        //public decimal Prepay { get; set; }
        public bool? Removed { get; set; }
        /// <summary>
        /// Prepayment
        /// </summary>
        public virtual OrderPrepayment Prepayment { get; set; }
        /// <summary>
        /// Order items
        /// </summary>
        public virtual ICollection<OrderItem> Items { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
        /// <summary>
        /// Client
        /// </summary>
        [ForeignKey("ClientId")]
        public virtual Client ClientInfo { get; set; }
        public int? ClientId { get; set; }
        /// <summary>
        /// Discount
        /// </summary>
        [ForeignKey("DiscountId")]
        public virtual Discount DiscountInfo { get; set; }
        public int? DiscountId { get; set; }

        public int? ProductId { get; set; }
        #region notMaped
        [NotMapped]
        public decimal Prepay { get { return Prepayment == null ? 0 : Prepayment.Total; } }
        //[NotMapped]
        //public DateTime DatePrepay { get{ return Prepayment == null ? Date.min : Prepayment.Date; } }
        #endregion 
    }
}
