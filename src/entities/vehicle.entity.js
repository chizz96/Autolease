import { EntitySchema } from "typeorm";
import { User } from "./user.entity.js";
import { VehicleStatus, fuelTypes, TransmissionType } from "../types/vehicles.js";



export const Vehicle = new EntitySchema({
  name: "Vehicle",
  tableName: "vehicles",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    brand: {
      type: "varchar",
    },

    model: {
      type: "varchar",
    },

    year: {
      type: "int",
    },

    vin: {
      type: "varchar",
      unique: true,
    },

    licensePlate: {
      type: "varchar",
      unique: true,
    },

    color: {
      type: "varchar",
    },

    engineType: {
      type: "varchar",
      nullable: true,
    },

    fuelType: {
      type: "enum",
      enum: Object.values(fuelTypes),
    },

    transmission: {
      type: "enum",
      enum: Object.values(TransmissionType),
    },

    seats: {
      type: "int",
    },

    mileage: {
      type: "int",
      default: 0,
    },

    dailyPrice: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    description: {
      type: "text",
      nullable: true,
    },

    city: {
      type: "varchar",
    },

    state: {
      type: "varchar",
    },

    address: {
      type: "text",
    },

    imageUrls: {
      type: "simple-array",
      nullable: true,
    },

    latitude: {
      type: "decimal",
      precision: 10,
      scale: 7,
      nullable: true,
    },

    longitude: {
      type: "decimal",
      precision: 10,
      scale: 7,
      nullable: true,
    },

    instantBooking: {
      type: "boolean",
      default: false,
    },

    minimumRentalDays: {
      type: "int",
      default: 1,
    },

    maximumRentalDays: {
      type: "int",
      default: 30,
    },

    status: {
      type: "enum",
      enum: Object.values(VehicleStatus),
      default: VehicleStatus.AVAILABLE,
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
    owner: {
      type: "many-to-one",
      target: "User",

      joinColumn: {
        name: "userId",
      },

      inverseSide: "vehicles",

      onDelete: "CASCADE",
    },

    // bookings: {
    //   type: "one-to-many",
    //   target: "Booking",
    //   inverseSide: "vehicle",
    // },

    // reviews: {
    //   type: "one-to-many",
    //   target: "Review",
    //   inverseSide: "vehicle",
    // },
  },
});