import express from "express";
import { UserLogService } from "../services/userlogService/UserLogService";

const router = express();

router.post("/userLogRegistration", (req, res ) => {
    UserLogService.addLog(
        req.body.id,
        req.body.activity,
      )
        .then((response: any) => {
          res.status(response.status).send(response);
        })
        .catch((error) => {
          res.status(error.status).send(error);
        });
});

UserLogService.getUserLogService();