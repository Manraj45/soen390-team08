// DEPENDENCIES
import express from "express";

// SERVICES
import { TriggerService } from "../services/triggerService/TriggerService";
import fetchUserEmail from "../helpers/fetchAccountEmail";
import { AccountManagementService } from "../services/accountManagementService/AccountManagementService";
import { authenticateToken, verifyRole } from "../services/authenticationService/AuthenticationService";
import { Role } from "../models/Account";

const router = express();

// Creating a singleton instance of the AccountManagementService
AccountManagementService.getAccountManagementService();

const triggerService = new TriggerService();

/*
  Fetches all trigger states from the user that is currently logged in the following order:
  [QUANTITY_REACHES_ZERO, ROLE_CHANGE, COMPONENT_ORDER, BIKE_ORDER]
*/
router.get("/", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const email: string = fetchUserEmail(req);
  triggerService
  .getCurrentTriggers(email)
  .then((response) => {
    res.json(response);
  })
  .catch((error) => {
    res.status(error.status).send(error.message);
  });
});

// Toggles the trigger of specified type from currently logged in user
router.put("/toggle/:triggerType", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const email: string = fetchUserEmail(req);
    triggerService
    .toggleTrigger(req.params.triggerType, email)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

// Adds a row to user_triggers table
router.post("/add", (req, res) => {
  triggerService
  .addUserTriggers(req.body.email)
  .then((response) => {
    res.send(response);
  })
  .catch((error) => {
    res.status(error.status).send(error.message);
  });
});

export default router;
