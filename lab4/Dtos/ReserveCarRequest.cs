using System;

namespace lab4.Dtos
{
    public class ReserveCarRequest
    {
        public int CarId { get; set; }
        public int CustomerId { get; set; }
        public DateTime ReservationDate { get; set; }
        public int PeriodInDays { get; set; }
    }
}
