import { EntitySchema } from "typeorm";
import { bookingStatus } from "../types/bookings";

export const Booking = new EntitySchema({
  name: "Booking",
  tableName: "bookings",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    pickupDate: {
      type: "timestamptz",
    },

    returnDate: {
      type: "timestamptz",
    },

    pickupLocation: {
      type: "text",
    },

    returnLocation: {
      type: "text",
    },

  
    status: {
      type: "enum",
      enum: Object.values(bookingStatus),
      default: bookingStatus.PENDING,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    customer: {
      type: "many-to-one",
      target: "User",

      joinColumn: {
        name: "customerId",
      },

      inverseSide: "bookings",

      onDelete: "CASCADE",
    },

    vehicle: {
      type: "many-to-one",
      target: "Vehicle",

      joinColumn: {
        name: "vehicleId",
      },

      inverseSide: "bookings",

      onDelete: "CASCADE",
    },

    payment: {
      type: "one-to-one",
      target: "Payment",

      inverseSide: "booking",
    },

    // review: {
    //   type: "one-to-one",
    //   target: "Review",

    //   inverseSide: "booking",
    // },
  },
});