using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public string Link { get; set; }
        public string LinkPhoto { get; set; }
        public int UserId { get; set; }
        public string Commentary { get; set; }
    }
}
