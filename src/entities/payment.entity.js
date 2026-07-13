import { EntitySchema } from "typeorm";

export const Payment = new EntitySchema({
  name: "Payment",
  tableName: "payments",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    currency: {
      type: "varchar",
      length: 3,
      default: "NGN",
    },

    paymentMethod: {
      type: "enum",
      enum: [
        "card",
        "bank_transfer",
        "wallet",
      ],
    },

    paymentGateway: {
      type: "enum",
      enum: [
        "paystack",
        "flutterwave",
        "wallet",
      ],
      nullable: true,
    },

    gatewayReference: {
      type: "varchar",
      unique: true,
    },

    status: {
      type: "enum",
      enum: [
        "pending",
        "successful",
        "failed",
        "refunded",
      ],
      default: "pending",
    },

    paidAt: {
      type: "timestamp",
      nullable: true,
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
    booking: {
      type: "one-to-one",
      target: "Booking",

      joinColumn: {
        name: "bookingId",
      },

      inverseSide: "payment",

      onDelete: "CASCADE",
    },

    transactions: {
      type: "one-to-many",
      target: "WalletTransaction",

      inverseSide: "payment",
    },
  },
});