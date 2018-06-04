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
        /// Has Photo or now
        /// </summary>
        public bool HasPhoto { get; set; }
        /// <summary>
        /// Show into store
        /// </summary>
        public bool Show { get; set; }
        /// <summary>
        /// Product description
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Removed flag
        /// </summary>
        public bool IsRemoved { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
    }

}