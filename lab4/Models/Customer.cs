using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Customer
    {
        public short Customerid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Dob { get; set; }
        public string Licensenumber { get; set; }

        public virtual Order Order { get; set; }
    }
}
