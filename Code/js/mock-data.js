export const demo = {

  paymentMethods: [
    { key: 'upi', label: 'UPI', description: 'No UPI ID is requested or stored.' },
    { key: 'card', label: 'Debit card', description: 'No card number, CVV or expiry is requested.' }
  ],

  booking: {
    train: "Vande Bharat Express",
    from: "New Delhi",
    to: "Lucknow",
    date: "27 Aug 2026",
    class: "AC Chair Car",
    passenger: "Demo Passenger",
    fare: "₹1,245",
    id: "TATKALONE-DEMO-482731"
  },

  scenarios: {

    /* --------------------------------
       1. FULLY CONFIRMED
    -------------------------------- */

    confirmed: {

      number: '01',
      shortTitle: 'Fully confirmed',
      selectorText: 'Payment, ticket and seat confirmed.',
      tone: 'success',

      key: "confirmed",

      heading: "Booking confirmed",

      message:
        "Your payment and booking were successful. Your ticket and seat are confirmed.",

      payment: "Successful",
      booking: "Successful",
      ticket: "Confirmed",
      seat: "Seat 24 · C2",

      pnr: "2739712890",
      ticketClass: "AC Chair Car (CC)",
      coach: "C2",
      berth: "24 · Window seat",

      timeline: {
        payment: "completed",
        booking: "completed",
        ticket: "completed",
        seat: "completed"
      },

      nextAction: "No action needed",

      actionDescription:
        "Your booking is complete. You can view your booking details.",

      actionIcon: "✓",

      next: "View booking details",

      cta: 'View recovery guidance',

      refund: {
        applicable: false
      }
    },


    /* --------------------------------
       2. RAC
    -------------------------------- */

    rac: {

      number: '02',
      shortTitle: 'RAC seat',
      selectorText: 'Booking confirmed with RAC allotment.',
      tone: 'rac',

      key: "rac",

      heading: "RAC seat allotted",

      message:
        "Your payment and booking were successful. Your ticket is confirmed with RAC status.",

      payment: "Successful",
      booking: "Successful",
      ticket: "Confirmed",
      seat: "RAC 18",

      pnr: "4827619305",
      ticketClass: "AC 3 Tier (3A)",
      coach: "D4",
      berth: "RAC 18",

      timeline: {
        payment: "completed",
        booking: "completed",
        ticket: "completed",
        seat: "rac"
      },

      nextAction: "Your booking is successful",

      actionDescription:
        "No payment retry is required. Your RAC status has been recorded.",

      actionIcon: "R",

      next: "View booking details",

      cta: 'View recovery guidance',

      refund: {
        applicable: false
      }
    },


    /* --------------------------------
       3. WAITING LIST + CONFIRMED SEAT
    -------------------------------- */

    wait_confirmed: {

      number: '03',
      shortTitle: 'Waiting list + seat',
      selectorText: 'Ticket waitlisted; seat shown separately.',
      tone: 'wait',

      key: "wait_confirmed",

      heading: "Waiting List · Seat allotted",

      message:
        "Your booking was successful. Your ticket is currently waitlisted and a seat has been allotted.",

      payment: "Successful",
      booking: "Successful",
      ticket: "Waiting List",
      seat: "Seat 32 · B3",

      pnr: "3918456720",
      ticketClass: "AC 3 Tier (3A)",
      coach: "B3",
      berth: "32 · Side lower",
      waitlistNumber: "WL 10",

      timeline: {
        payment: "completed",
        booking: "completed",
        ticket: "wait",
        seat: "completed"
      },

      nextAction: "No payment retry needed",

      actionDescription:
        "Your booking was processed successfully. Keep checking the ticket status for updates.",

      actionIcon: "W",

      next: "View booking details",

      cta: 'View recovery guidance',

      refund: {
        applicable: false
      }
    },


    /* --------------------------------
       4. WAITING LIST + RAC
    -------------------------------- */

    wait_rac: {

      number: '04',
      shortTitle: 'Waiting list + RAC',
      selectorText: 'Ticket waitlisted with RAC information.',
      tone: 'wait',

      key: "wait_rac",

      heading: "Waiting List · RAC",

      message:
        "Your booking was successful. Your ticket is waitlisted and the current seat status is RAC.",

      payment: "Successful",
      booking: "Successful",
      ticket: "Waiting List",
      seat: "RAC 42",

      pnr: "6172948350",
      ticketClass: "Sleeper (SL)",
      coach: "S4",
      berth: "RAC 42",
      waitlistNumber: "WL 24",

      timeline: {
        payment: "completed",
        booking: "completed",
        ticket: "wait",
        seat: "rac"
      },

      nextAction: "No payment retry needed",

      actionDescription:
        "Your booking has already been processed. You can wait for the ticket status to update.",

      actionIcon: "W",

      next: "View booking details",

      cta: 'View recovery guidance',

      refund: {
        applicable: false
      }
    },


    /* --------------------------------
       5. WAITING LIST + SEAT FAILED
    -------------------------------- */

    wait_failed: {

      number: '05',
      shortTitle: 'Seat allotment failed',
      selectorText: 'Payment succeeded; seat allotment needs attention.',
      tone: 'error',

      key: "wait_failed",

      heading: "Waiting List · Seat allotment failed",

      message:
        "Your payment and booking were successful, but seat allotment could not be completed.",

      payment: "Successful",
      booking: "Successful",
      ticket: "Waiting List",
      seat: "Seat allotment failed",

      pnr: "7503189462",
      ticketClass: "Sleeper (SL)",
      coach: "Not allotted",
      berth: "Pending allotment",
      waitlistNumber: "WL 56",

      timeline: {
        payment: "completed",
        booking: "completed",
        ticket: "wait",
        seat: "failed"
      },

      nextAction: "Check your booking status",

      actionDescription:
        "Your payment was successful. Do not make another payment just because seat allotment failed.",

      actionIcon: "!",

      next: "View booking details",

      cta: 'See recovery guidance',

      refund: {
        applicable: false
      }
    },


    /* --------------------------------
       6. PAYMENT UNSUCCESSFUL
    -------------------------------- */

    payment_error: {

      number: '06',
      shortTitle: 'Payment unsuccessful',
      selectorText: 'Payment and booking could not be confirmed.',
      tone: 'error',

      key: "payment_error",

      heading: "Payment could not be confirmed",

      message:
        "We could not confirm the payment and booking at this time.",

      payment: "Unsuccessful",
      booking: "Unsuccessful",
      ticket: "Pending",
      seat: "Seat allotment failed",

      pnr: "Not generated",
      ticketClass: "Not available",
      coach: "Not allotted",
      berth: "Seat allotment failed",

      timeline: {
        payment: "failed",
        booking: "pending",
        ticket: "pending",
        seat: "pending"
      },

      nextAction: "Do not make another payment yet",

      actionDescription:
        "Check the saved booking status first. If your bank shows a debit, keep the transaction reference while the payment is being resolved.",

      actionIcon: "×",

      next: "Check recovery options",

      cta: 'See recovery options',

      refund: {
        applicable: true,

        status: "Being processed",

        expected:
          "Within the applicable bank/payment timeline",

        reference:
          "RFND-DEMO-1234",

        note:
          "If your account was debited but the ticket was not issued, keep the transaction reference and check the booking status before trying again."
      }
    }

  },


  /* --------------------------------
     ERROR INFORMATION
  -------------------------------- */

  error: {

    title:
      "Payment needs confirmation",

    failure:
      "The payment response could not be matched to a completed Tatkal booking.",

    owner:
      "The payment response was not successfully matched with a completed booking.",

    evidence:
      "Keep your bank transaction reference if your account was debited.",

    next:
      "Check the saved booking status before attempting another payment.",

    time:
      "Allow time for the payment response to be updated."
  },


  /* --------------------------------
     SUPPORT
  -------------------------------- */

  support:
    "This is a demonstration prototype. No real payment, booking or passenger data is processed."

};
