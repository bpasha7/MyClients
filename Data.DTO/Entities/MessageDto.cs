using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Entities
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string From { get; set; }
        public int Type { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public bool IsRemoved { get; set; }
        public int UserId { get; set; }
    }
}
