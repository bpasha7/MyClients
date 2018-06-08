using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.DTO.Entities
{
    public class StoreDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public DateTime ActivationEnd { get; set; }
        public bool IsActive { get; set; }
        public long Visits { get; set; }
    }

    public class StoreForClientDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public string UserName { get; set; }
        public long Visits { get; set; }
        public decimal Avarage { get
            {
                return Products.Count > 0 ? Math.Round(Products.Sum(p => p.Price) / Products.Count, 0) : 0;
            } }
        public IList<StoreProductDto> Products { get; set; }
    }
}
