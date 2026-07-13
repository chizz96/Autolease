import { EntitySchema } from "typeorm";
//import { WalletTransaction } from "./wallet-transaction.entity.js";
import { User } from "./user.entity.js";
import { WalletStatus } from "../types/walletStatus.js";
import { SUPPORTED_CURRENCIES } from "../types/walletcurrency.js";


export const Wallet = new EntitySchema({
  name: "Wallet",
  tableName: "wallets",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    balance: {
      type: "decimal",
      precision: 12,
      scale: 2,
      default: 0,
    },

    currency: {
      type: "varchar",
      enum: Object.values(SUPPORTED_CURRENCIES),
      default: "NGN",
    },

    status: {
      type: "enum",
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACTIVE,
    },

    isActive: {
      type: "boolean",
      default: false,
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
    user: {
      type: "one-to-one",
      target: "User",
      inverseSide: "wallet",

      joinColumn: {
        name: "userId",
      },

      onDelete: "CASCADE",
    },

    transactions: {
      type: "one-to-many",
      target: "WalletTransaction",
      inverseSide: "wallet",
    },
  },
});