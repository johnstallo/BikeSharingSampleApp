using System;

namespace app
{
    public class Services
    {
        public string Users { get; set; }

        public string Bikes { get; set; }

        public string Reservations { get; set; }
        public string ReservationEngine { get; set; }

        public string Billing { get; set; }
    }

    public class CustomConfiguration
    {
        public Services Services { get; set; }

    }
}
