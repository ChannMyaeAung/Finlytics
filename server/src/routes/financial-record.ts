import express from "express";
import type { Express } from "express";
import {
  getAllByUserId,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
} from "../controllers/financial-record-controllers.js";

const router: express.Router = express.Router();

router.get("/getAllByUserID/:userId", getAllByUserId);
router.post("/", createFinancialRecord);
router.put("/:id", updateFinancialRecord);
router.delete("/:id", deleteFinancialRecord);

export default router;
