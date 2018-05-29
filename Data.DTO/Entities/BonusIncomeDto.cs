using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class BonusIncomeDto
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public decimal Total { get; set; }
        public DateTime Date { get; set; }
    }
}
