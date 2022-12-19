using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Audittable
    {
        public decimal? Id { get; set; }
        public string Operation { get; set; }
        public DateTime? Operationdate { get; set; }
        public string Tablename { get; set; }
    }
}
