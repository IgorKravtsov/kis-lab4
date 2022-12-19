using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Car
    {
        public Car()
        {
            Orders = new HashSet<Order>();
        }

        public short Carid { get; set; }
        public string Mark { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public decimal? Hostid { get; set; }
        public string Plate { get; set; }

        public virtual Host Host { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
