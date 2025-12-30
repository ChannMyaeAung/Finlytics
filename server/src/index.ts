import dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import mongoose from "mongoose";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config({ path: ".env" });
}

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const mongoURI = process.env.MONGODB_URI ?? process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB Database"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
