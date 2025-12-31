import express from "express";
import type { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record.ts";

const router: express.Router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "Missing userId parameter." });
    }

    const records = await FinancialRecordModel.find({ userId });

    if (records.length === 0) {
      return res
        .status(404)
        .send({ message: "No records found for this user." });
    }

    return res.status(200).send(records);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    // send the new data to the body
    const newRecordBody = req.body;

    // create a new financial record in the database
    const createdRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await createdRecord.save();

    return res.status(201).send(savedRecord);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send(record);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
