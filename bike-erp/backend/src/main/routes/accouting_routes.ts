// DEPENDENCIES
import express from "express";

// SERVICES
import { AccountingService } from "../services/accountingService/AccountingService";
import { authenticateToken } from "../services/authenticationService/AuthenticationService";
import fetchUserEmail from "../helpers/fetchAccountEmail";

const router = express();

// Creating a singleton instance of the AccountingService
AccountingService.getAccountingService();

router.get("/accountPayables", authenticateToken, (req, res) => {
  const userEmail: string = fetchUserEmail(req);

  AccountingService.getAccountPayablesForUser(userEmail)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.get(
  "/accountPayables/:id/transactionItem",
  authenticateToken,
  (req, res) => {
    const id = Number(req.params.id);
    // Check for validity of account payable id passed. Must be an int
    if (!Number.isInteger(id)) {
      res.status(400).send({ message: "Invalid Account Payable ID" });
    } else {
      AccountingService.getTransactionItemsByAccountPayable(id)
        ?.then((response) => {
          res.json(response);
        })
        .catch((error) => {
          res.status(error.status ? error.status : 500).send({
            message: error.sqlMessage ? error.sqlMessage : error.message,
          });
        });
    }
  }
);

router.get("/accountReceivables", authenticateToken, (req, res) => {
  const userEmail: string = fetchUserEmail(req);
  AccountingService.getAccountReceivable(userEmail)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.get("/accountReceivables/:id/bikes", authenticateToken, (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).send({ message: "Invalid Account Receivable ID" });
  } else {
    AccountingService.getBikesByAccountReceivable(id)
      ?.then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(error.status ? error.status : 500).send({
          message: error.sqlMessage ? error.sqlMessage : error.message,
        });
      });
  }
});

export default router;
