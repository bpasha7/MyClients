using System;
using System.Collections.Generic;
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
        public IList<StoreProductDto> Products { get; set; }
    }
}
