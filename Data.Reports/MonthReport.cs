using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Reports
{
    public class MonthReport
    {
        public int Year { get; set; }
        public int MonthNumber { get; set; } 
        public string Month { get; set; }
        public decimal Total { get; set; }
        public decimal Outgoings { get; set; }
    }
}
