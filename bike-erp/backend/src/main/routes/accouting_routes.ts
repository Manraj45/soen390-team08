// DEPENDENCIES
import express from "express";

// SERVICES
import { AccountingService } from "../services/accountingService/AccountingService";
import { ReportingService } from "../services/reportingService/ReportingService";
import { authenticateToken, verifyRole } from "../services/authenticationService/AuthenticationService";
import fetchUserEmail from "../helpers/fetchAccountEmail";
import { Role } from "../models/Account";

const router = express();

// Creating a singleton instance of the AccountingService
AccountingService.getAccountingService();

//Creating a singleton instance of the ReportingService
ReportingService.getReportingService();

router.get("/accountPayables", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
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
  authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]),
  (req, res) => {
    const id = Number(req.params.id);
    // Check for validity of account payable id passed. Must be an int
    if (!Number.isInteger(id)) {
      res.status(400).send({ message: "Invalid Account Payable ID" });
    } else {
      AccountingService.getTransactionItemsByAccountPayableId(id)
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
    AccountingService.getBikesByAccountReceivableId(id)
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


router.get("/accountReceivables/report", authenticateToken, (req, res) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const myDataOnly = (req.query.myDataOnly === "true");
  const userEmail: string = fetchUserEmail(req);

  ReportingService.getSalesReportCSVInfo(userEmail, startDate, endDate, myDataOnly).then((response) => {
    res.status(202).json(response)
  })
    .catch((error) => {
      res.status(error.status).send(error.sqlMessage ? error.sqlMessage : error.message)
    })
})

router.get("/accountPayables/report", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const myDataOnly = (req.query.myDataOnly === "true");
  const userEmail: string = fetchUserEmail(req);

  ReportingService.getExpensesReportCSVInfo(userEmail, startDate, endDate, myDataOnly).then((response) => {
    res.status(202).json(response)
  })
    .catch((error) => {
      res.status(error.status).send(error.sqlMessage ? error.sqlMessage : error.message)
    })
})

export default router;
