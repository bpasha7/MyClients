using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class OutgoingDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Total { get; set; }
        public DateTime Date { get; set; }
    }
}
