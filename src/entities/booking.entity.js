import { EntitySchema } from "typeorm";

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
      type: "timestamp",
    },

    returnDate: {
      type: "timestamp",
    },

    pickupLocation: {
      type: "text",
    },

    returnLocation: {
      type: "text",
    },

  
    status: {
      type: "enum",
      enum: [
        "pending",
        "confirmed",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "pending",
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