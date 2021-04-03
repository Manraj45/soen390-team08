// DEPENDENCIES
import express from "express";

// SERVICES
import { authenticateToken, AuthenticationService, verifyRole } from "../services/authenticationService/AuthenticationService";
import { InventoryManagementService } from "../services/inventoryManagementService/InventoryManagementService";
import { Role } from "../models/Account";

const router = express();
const inventoryManagementService = new InventoryManagementService();

router.get("/", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  inventoryManagementService
    .getAllComponents()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

//Backend endpoint to get all the component types in categories
router.get("/componentTypes", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  inventoryManagementService
    .getComponentTypes(req.body.location, req.body.size)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.get("/:component_id", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  inventoryManagementService
    .getComponent(req.params.component_id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.messages);
    });
});

// Edit the quantity depending on the Id of the component
router.put("/updateQuantity", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const id = req.body.id;
  const quantity = req.body.quantity;
  inventoryManagementService
    .editComponent(id, quantity)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

// API used to modify the quantity of each components that are sold
router.put("/sellComponents", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const componentSaleList: Array<any> = req.body.componentSaleList;
  inventoryManagementService
    .editComponentQuantitySale(componentSaleList)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

// API endpoint for ordering new components
// Requires a orderList in body
router.put("/orderComponents", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  const orderList: Array<any> = req.body.orderList.orderList;

  // Setting the endpoint header to authorization
  const authHeader = req.headers["authorization"];

  // setting token header
  const token = authHeader && authHeader.split(" ")[1];
  const userAccount = AuthenticationService.retrieveAccountFromToken(token);
  const userEmail: string = userAccount.data;

  inventoryManagementService
    .orderComponents(orderList, userEmail)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.get("/componentLocation/:component_id", authenticateToken, verifyRole([Role.ADMIN, Role.MANAGER, Role.EMPLOYEE]), (req, res) => {
  inventoryManagementService
    .getComponentLocation(req.params.component_id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

export default router;
