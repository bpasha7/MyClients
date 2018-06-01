using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        //public int UserId { get; set; }
        public bool HasPhoto { get; set; }
    }
}
