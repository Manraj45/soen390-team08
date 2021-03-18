import express from "express";
import { UserLogService } from "../services/userlogService/UserLogService";

const router = express();

/**
 * This file provides the rotes for the front end to push or query user logs to the database
 */

// posts a user log to the database
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

// retrieves a user log from the user email
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

  // retrieves all user logs
  router.get("/", (req, res) => {
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

export default router;