using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    class Outgoing
    {
        public Outgoing() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }
        public decimal Total { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }
}
