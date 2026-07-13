import express from "express";
import app from "./app.js";
import { AppDataSource } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 3000;


const startServer = async () => {

    try {

      await AppDataSource.initialize();
      console.log("Database connected successfully");
    
  } catch (error) {
      console.error("Error connecting to the database:", error);
    
  }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
