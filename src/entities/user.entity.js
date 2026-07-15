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
      select: false
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

    googleId: {
      type: "var",
      unique: true,
      sparse: true
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
      type: "timestamptz",
      nullable: true,
    },
    
    paswordResetTokenHash: {
        type: "varchar",
        nullable: true
      },

    passwordResetExpires: {
      type: "timestamp",
      nullable: true
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
      type: "timestamptz",
      createDate: true,
    },

    updatedAt: {
      type: "timestamptz",
      updateDate: true,
    },

    deletedAt: {
      type: "timestamptz",
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

    vehicles: {
      type: "one-to-many",
      target: "Vehicle",
      inverseSide: "owner",
    },

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