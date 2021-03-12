import express from "express";
import { AccountingService } from "../services/accountingService/AccountingService";
import { authenticateToken, AuthenticationService } from "../services/authenticationService/AuthenticationService";

const router = express();

//Creating a singleton instance of the AccountingService
AccountingService.getAccountingService();

router.get('/accountPayables', authenticateToken, (req, res) => {
    const userEmail: string = fetchUserEmail(req);

    AccountingService.getAccountPayablesForUser(userEmail).then((response) => {
        res.json(response);
    }).catch(error => {
        res.status(error.status).send(error.message);
    })
})

router.get('/accountPayables/:id/transactionItem', authenticateToken, (req, res) => {
    const id = Number(req.params.id)
    // Check for validity of account payable id passed. Must be an int
    if (!Number.isInteger(id)) {
        res.status(400).send({ message: "Invalid Account Payable ID" });
    } else {
        AccountingService.getTransactionItemsByAccountPayable(id)?.then(response => {
            res.json(response);
        }).catch(error => {
            res.status(error.status ? error.status : 500).send({ message: error.sqlMessage ? error.sqlMessage : error.message });
        })
    }
})

router.get('/accountReceivables', authenticateToken, (req, res) => {
    const userEmail: string = fetchUserEmail(req);
    AccountingService.getAccountReceivable(userEmail).then(response => {
        res.json(response)
    }).catch(error => {
        res.status(error.status).send(error.message);
    })
})

router.get('/accountReceivables/:id/bikes', authenticateToken,(req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).send({ message: "Invalid Account Receivable ID" })
    } else {
        AccountingService.getBikesByAccountReceivable(id)?.then(response => {
            res.json(response);
        }).catch(error => {
            res.status(error.status ? error.status : 500).send({ message: error.sqlMessage ? error.sqlMessage : error.message });
        })
    }
})

const fetchUserEmail = (req): string => {
    //Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];

    //setting token header
    const token = authHeader && authHeader.split(" ")[1];
    const userAccount = AuthenticationService.retrieveAccountFromToken(token);
    const userEmail: string = userAccount.data;
    return userEmail;
}
export default router;