import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// import connectDB from "./config/dbConnection.js";
// connectDB();
import usersRoute from "./routes/users.js";
import transectionRoutes from "./routes/transections.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/users", usersRoute);
app.use("/api/transactions", transectionRoutes);

const port = 9200;
import connect_db from "./database_connection.js";
app.listen(port, () => {
  connect_db();
  console.log(`server is running at http://localhost:${port}`);
});
