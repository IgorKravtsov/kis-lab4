using System;
using System.Collections.Generic;

#nullable disable

namespace lab4.Models
{
    public partial class Host
    {
        public Host()
        {
            Cars = new HashSet<Car>();
        }

        public decimal Hostid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public virtual ICollection<Car> Cars { get; set; }
    }
}
