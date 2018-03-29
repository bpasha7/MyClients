using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class OrderDto
    {
        public int Id { get; set; }
        public decimal Total { get; set; }
        public int UserId { get; set; }
        public int ClientId { get; set; }
        public int ProductId { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Commentary { get; set; }
        public bool Removed { get; set; }
    }
}
