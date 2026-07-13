import { EntitySchema } from "typeorm";
import { TransactionStatus, TransactionType } from "../types/transaction.js";

export const WalletTransaction = new EntitySchema({
  name: "WalletTransaction",
  tableName: "wallet_transactions",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    amount: {
      type: "decimal",
      precision: 12,
      scale: 2,
    },

    type: {
      type: "enum",
      enum: Object.values(TransactionType),
    },

    status: {
      type: "enum",
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },

    reference: {
      type: "varchar",
      unique: true,
    },

    description: {
      type: "text",
      nullable: true,
    },

    balanceBefore: {
      type: "decimal",
      precision: 12,
      scale: 2,
    },

    balanceAfter: {
      type: "decimal",
      precision: 12,
      scale: 2,
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
    wallet: {
      type: "many-to-one",
      target: "Wallet",
      joinColumn: { name: "walletId" },
      onDelete: "CASCADE",
      inverseSide: "transactions",
    },

    booking: {
      type: "many-to-one",
      target: "Booking",
      joinColumn: { name: "bookingId" },
      nullable: true,
      onDelete: "SET NULL",
      inverseSide: "walletTransactions",
    },

    payment: {
      type: "many-to-one",
      target: "Payment",
      joinColumn: { name: "paymentId" },
      nullable: true,
      onDelete: "SET NULL",
      inverseSide: "walletTransactions",
    },
  },
});