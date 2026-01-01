import type { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record.ts";

export async function getAllByUserId(req: Request, res: Response) {
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
    console.error("Error fetching records by userId:", error);
    return res.status(500).send(error);
  }
}

export async function createFinancialRecord(req: Request, res: Response) {
  try {
    const newRecordBody = req.body;
    const createdRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await createdRecord.save();

    return res.status(201).send(savedRecord);
  } catch (error) {
    console.error("Error creating record:", error);
    return res.status(500).send(error);
  }
}

export async function updateFinancialRecord(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const newRecordBody = req.body;

    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      {
        new: true,
      }
    );

    if (!record) {
      return res.status(404).send("Record not found");
    }

    return res.status(200).send(record);
  } catch (error) {
    console.error("Error updating record:", error);
    return res.status(500).send(error);
  }
}

export async function deleteFinancialRecord(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) {
      return res.status(404).send("Record not found");
    }

    return res.status(200).send("Record deleted successfully");
  } catch (error) {
    console.error("Error deleting record:", error);
    return res.status(500).send(error);
  }
}
