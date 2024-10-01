import { Request, Response } from "express";
import FinancialRecordModel from "../schema/financialRecord";

//! ALL RECORDS
export const getRecords = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }

    res.status(200).send(records);
  } catch (error) {
    console.log("Error in fetching records", error);
    res.status(500).send(error);
  }
};

//! CREATE RECORD
export const createRecord = async (req: Request, res: Response) => {
  const record = req.body;
  const newRecord = new FinancialRecordModel(record);

  try {
    await newRecord.save();
    res.status(200).send(newRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

//! UPDATE RECORD
export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const record = req.body;

  try {
    const updateRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      record,
      { new: true }
    );

    if (!updateRecord) return res.status(404).send();
    res.status(200).send(updateRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

//! DELETE RECORD
export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteRecord = await FinancialRecordModel.findByIdAndDelete(id);
    if (!deleteRecord) return res.status(404).send();

    res.status(200).json({ message: "Record deleted succesfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
