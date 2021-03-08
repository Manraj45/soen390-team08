import express from "express";
import { AccountingService } from "../services/accountingService/AccountingService";

const router = express();

//Creating a singleton instance of the AccountingService
AccountingService.getAccountingService()
