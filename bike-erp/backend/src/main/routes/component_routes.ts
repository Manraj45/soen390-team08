// DEPENDENCIES
import express from "express";

// SERVICES
import { AuthenticationService } from "../services/authenticationService/AuthenticationService";
import { InventoryManagementService } from "../services/inventoryManagementService/InventoryManagementService";

const router = express();
const inventoryManagementService = new InventoryManagementService();

router.get("/", (req, res) => {
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
router.get("/componentTypes", (req, res) => {
  inventoryManagementService
    .getComponentTypes(req.body.location, req.body.size)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.get("/:component_id", (req, res) => {
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
router.put("/updateQuantity", (req, res) => {
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
router.put("/sellComponents", (req, res) => {
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
router.put("/orderComponents", (req, res) => {
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

router.get("/componentLocation/:component_id", (req, res) => {
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
