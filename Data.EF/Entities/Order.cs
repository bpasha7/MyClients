using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
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
        /// <summary>
        /// Geting Total depends on date
        /// </summary>
        //public decimal GetTotal(DateTime begin, DateTime end)
        //{
        //    if (DatePrepay < begin || DatePrepay > end)
        //        return Prepay;
        //    return (DatePrepay.Month == Date.Month && DatePrepay.Year == Date.Year) ? Total + Prepay : Total;
        //}
        /// <summary>
        /// Prepay sum if exist
        /// </summary>
        [NotMapped]
        public decimal Prepay { get { return Prepayment == null ? 0 : Prepayment.Total; } }
        /// <summary>
        /// Prepay date if exist
        /// </summary>
        [NotMapped]
        public DateTime DatePrepay { get { return Prepayment == null ? DateTime.Now : Prepayment.Date; } }
        /// <summary>
        /// Products id list
        /// </summary>
        [NotMapped]
        public IList<int> ProductsId
        {
            get
            {
                return Items == null ? null : Items.Select(p => p.ProductInfo.Id).ToList();
            }
        }
        /// <summary>
        /// Show order products name max 500 char
        /// </summary>
        [NotMapped]
        public string Label
        {
            get
            {
                if (Items == null || Items.Count == 0)
                    return "";
                var names = Items.Select(p => p.ProductInfo.Name).Aggregate((i, j) => i + ", " + j);
                return names.Length > 50 ? names.Substring(0, 50) : names;
                //return Items != null ? "" : Items.Select(p => p.ProductInfo.Name).Aggregate((i, j) => i + ", " + j);
            }
        }
        /// <summary>
        /// Client short name
        /// </summary>
        [NotMapped]
        public string ClientName {
            get
            {
                return ClientInfo == null ? "" : $"{ClientInfo.FirstName} {ClientInfo.LastName[0]}.";
            }
        }

        #endregion 
    }
}
