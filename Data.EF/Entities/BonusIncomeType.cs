using Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data.EF.Entities
{
    public class BonusIncomeType : IEntity<int>
    {
        public BonusIncomeType() { }
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Name { get; set; }

    }
}
