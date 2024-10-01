import express, { Express } from "express";
import { connectDB } from "./db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import financialRecordsRoute from "./routes/financialRecordsRoute";

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/records", financialRecordsRoute);

app.listen(port, () => {
  connectDB();
  console.log("server http://localhost:5000 kısmında başladı.");
});
