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

router.get("/userLogs/:user_id", (req, res) => {
    const email = req.params.email;
    UserLogService
      .getLog(email)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(error.status).send(error.messages);
      });
  });

  router.get("/userLogs", (req, res) => {
    UserLogService
      .getAllLogs()
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(error.status).send(error.messages);
      });
  });
  
UserLogService.getUserLogService();