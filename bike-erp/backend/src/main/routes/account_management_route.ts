import express from "express";
import { AccountManagementService } from "../services/accountManagementService/AccountManagementService";
import { authenticateToken } from "../services/authenticationService/AuthenticationService";

const router = express();

//Creating a singleton instance of the AccountManagementService
AccountManagementService.getAccountManagementService();

//Creating endpoint to allow the admins to update the role of other users
router.patch("/admin/update", authenticateToken, (req, res) => {
    AccountManagementService.updateRole(req.body.email, req.body.role)
        .then((response) => {
            res.status(202).send(response);
        })
        .catch((error) => {
            res.status(error.status).send(error);
        });
});

//Creating endpoint to fetch account from database
router.get("/admin/accounts", authenticateToken, (req, res) => {
    AccountManagementService.getAccounts()
        .then((response) => {
            res.status(202).send(response);
        })
        .catch((error) => {
            res.status(error.status).send(error);
        });
});

export default router;