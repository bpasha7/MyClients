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
    }
}
