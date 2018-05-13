using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    public class Message : IEntity<int>
    {
        public Message() { }
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// Text
        /// </summary>
        [Required]
        [MaxLength(256)]
        public string Text { get; set; }
        /// <summary>
        /// Who send
        /// </summary>
        [Required]
        [MaxLength(64)]
        public string From { get; set; }
        /// <summary>
        /// 1 - from site
        /// 2 - news
        /// </summary>
        [Required]
        public int Type { get; set; }
        /// <summary>
        /// Date when recived
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        public bool? IsRead { get; set; }
        public bool? IsRemoved { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }
}
