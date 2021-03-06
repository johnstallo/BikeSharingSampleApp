﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using app.Models;
using app.Models.Reservations;

namespace app.Exceptions
{
    public class ReservationRequestFailedException : Exception
    {
        public ReservationRequestFailedException(Reservation reservationDetails, ReservationState expectedState)
            : base($"Reservation request failed for reservationID '{reservationDetails.ReservationId}'. Expected state: '{expectedState.ToString()}'. Actual state: '{reservationDetails.State}'")
        { }
    }
}
