import express from "express";
import {
  convertCurrency,
  getCurrencySymbols,
} from "../controllers/currency-controllers.js";

const router: express.Router = express.Router();

// Get all currencies (symbols)
router.get("/symbols", getCurrencySymbols);

// Convert currency
router.get("/convert", convertCurrency);

export default router;
