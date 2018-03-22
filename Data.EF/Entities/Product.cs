using Domain.Interfaces.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.EF.Entities { 
	
	public class Product : IEntity<int>
    {
        public Product() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(128)]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }

}