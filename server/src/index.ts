import dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record.ts";
import currencyRouter from "./routes/currency.ts";
import cors from "cors";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config({ path: ".env" });
}

// creates the application instance
// exposes routing, middleware registration, and helpers for handling requests and responses
const app: Express = express();
const port = process.env.PORT || 5000;

// adds built-in middleware function that parses incoming requests with JSON payloads
// populates req.body with the parsed obj so we can access posted JSON data
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI ?? process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB Database"))
  .catch((err) => console.error(err));

app.use("/financial-records", financialRecordRouter);
app.use("/api/currency", currencyRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
