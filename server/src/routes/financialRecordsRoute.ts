import express from "express";
import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../controllers/financialRecordsController";

const router = express.Router();

//! ALL RECORDS
router.get("/:userId", getRecords);

//! CREATE RECORD
router.post("/", createRecord);

//! UPDATE RECORD
router.put("/:id", updateRecord);

//! DELETE RECORD
router.delete("/:id", deleteRecord);

export default router;
