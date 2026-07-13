import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";
import { User } from "../entities/user.entity.js";
import { Vehicle } from "../entities/vehicle.entity.js";
import { Wallet } from "../entities/wallet.entity.js";
import { AuthEntity } from "../entities/auth.entity.js";
//import { DriverLicense } from "../entities/driver-license.entity.js";
import { Payment } from "../entities/payment.entity.js";
import { Booking } from "../entities/booking.entity.js";
import { WalletTransaction } from "../entities/walletTransaction.entity.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  //   logging: false,
  entities: [User, Wallet, AuthEntity, Vehicle, Booking, WalletTransaction, Payment],
  //   migrations: [__dirname + "/../migrations/*.{ts,js}"],      
  //   subscribers: [__dirname + "/../subscribers/*.{ts,js}"],
});


