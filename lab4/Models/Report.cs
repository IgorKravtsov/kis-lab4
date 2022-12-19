using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Report
    {
        public short? Customerid { get; set; }
        public DateTime? Reservationdate { get; set; }
        public short? Orderid { get; set; }
        public DateTime? ExpectedEndPeriod { get; set; }
        public string Status { get; set; }
        public decimal? ActualDaysInRent { get; set; }
        public decimal? FinalPrice { get; set; }
    }
}
