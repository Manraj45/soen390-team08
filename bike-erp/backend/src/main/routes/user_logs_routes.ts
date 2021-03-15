import express from "express";
import { UserLogService } from "../services/userlogService/UserLogService";

const router = express();

UserLogService.getUserLogService();