using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.EF.Entities
{
    /// <summary>
    /// Клиент
    /// </summary>
    public class Client : IEntity<int>
    {
        public Client() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(128)]
        public string LastName { get; set; }
        [MaxLength(128)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string Phone { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Birthday { get; set; }
        [MaxLength(128)]
        public string Link { get; set; }
        [MaxLength(128)]
        public string LinkPhoto { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }
}
