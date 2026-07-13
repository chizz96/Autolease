import { EntitySchema } from "typeorm";
import { userRole } from "../types/userRole.js";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    firstName: {
      type: "varchar",
    },

    lastName: {
      type: "varchar",
    },

    email: {
      type: "varchar",
      unique: true,
    },

    password: {
      type: "varchar",
    },

    phoneNumber: {
      type: "varchar",
      nullable: true,
    },

    role: {
      type: "enum",
      enum: Object.values(userRole),
      default: userRole.CUSTOMER,
    },

    isVerified: {
      type: "boolean",
      default: false,
    },

    otp: {
      type: "varchar",
      nullable: true,
    },

    otpExpiresAt: {
      type: "timestamp",
      nullable: true,
    },
    
    profilePicture: {
      type: "text",
      nullable: true,
    },

    bio: {
      type: "text",
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

    deletedAt: {
      type: "timestamp",
      deleteDate: true,
    },
  },

  relations: {
    wallet: {
      type: "one-to-one",
      target: "Wallet",
      inverseSide: "user",
    },

    auth: {
      type: "one-to-many",
      target: "Auth",
      inverseSide: "user",
    },

    // vehicles: {
    //   type: "one-to-many",
    //   target: "Vehicle",
    //   inverseSide: "owner",
    // },

    // bookings: {
    //   type: "one-to-many",
    //   target: "Booking",
    //   inverseSide: "customer",
    // },

    // reviews: {
    //   type: "one-to-many",
    //   target: "Review",
    //   inverseSide: "reviewer",
    // },
  },
});