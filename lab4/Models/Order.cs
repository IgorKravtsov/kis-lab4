using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Order
    {
        public short? Orderid { get; set; }
        public short Customerid { get; set; }
        public short Carid { get; set; }
        public DateTime Reservationdate { get; set; }
        public decimal Period { get; set; }
        public DateTime? Returndate { get; set; }

        public virtual Car Car { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
