using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.EF.Entities
{

    public class Store : IEntity<int>
    {
        public Store() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }
        public string About { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ActivationEnd { get; set; }
        public bool IsActive { get; set; }
        public long Visits { get; set; }
        /// <summary>
        /// User
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User UserInfo { get; set; }
        public int? UserId { get; set; }
        #region Not mapped
        [NotMapped]
        public string UserName
        {
            get
            {
                return UserInfo?.Name;
            }
        }
        [NotMapped]
        public IList<Product> Products { get; set; }
        [NotMapped]
        public bool? HasPhoto { get
            {
                return UserInfo?.HasPhoto;
            }
        }
        #endregion
    }

}