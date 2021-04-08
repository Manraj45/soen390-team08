import express from "express";
import { EmailService } from "../services/emailService/emailService";

const router = express();
// retrieves a user log from the user email
router.get("/emailFetching", (req, res) => {
    EmailService
      .getAllEmails()
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(error.status).send(error.messages);
      });
  });

  export default router;