using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    public class BonusIncome : IEntity<int>
    {
        public BonusIncome() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public decimal Total { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        /// <summary>
        /// Bonus Income Type
        /// </summary>
        [ForeignKey("TypeId")]
        public virtual BonusIncomeType Type { get; set; }
        public int? TypeId { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }
}
