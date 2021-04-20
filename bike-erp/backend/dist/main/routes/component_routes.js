"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const InventoryManagementService_1 = require("../services/inventoryManagementService/InventoryManagementService");
const Account_1 = require("../models/Account");
const router = express_1.default();
const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
router.get("/", AuthenticationService_1.authenticateToken, (req, res) => {
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
router.get("/componentTypes", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE, Account_1.Role.CUSTOMER]), (req, res) => {
    inventoryManagementService
        .getComponentTypes(req.query.location, req.query.size)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(400).send(error);
    });
});
router.post("/addComponent", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER]), (req, res) => {
    inventoryManagementService.addComponent(req.body.price, req.body.quantity, req.body.component_type, req.body.component_status, req.body.size, req.body.specificComponentType, req.body.location_name)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error);
    });
});
router.get("/:component_id", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE, Account_1.Role.CUSTOMER]), (req, res) => {
    inventoryManagementService
        .getComponent(req.params.component_id)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
// Edit the quantity depending on the Id of the component
router.put("/updateQuantity", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE, Account_1.Role.CUSTOMER]), (req, res) => {
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
router.put("/sellComponents", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE, Account_1.Role.CUSTOMER]), (req, res) => {
    const componentSaleList = req.body.componentSaleList;
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
router.put("/orderComponents", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    const orderList = req.body.orderList.orderList;
    // Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];
    // setting token header
    const token = authHeader && authHeader.split(" ")[1];
    const userAccount = AuthenticationService_1.AuthenticationService.retrieveAccountFromToken(token);
    const userEmail = userAccount.data;
    inventoryManagementService
        .orderComponents(orderList, userEmail)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
router.get("/componentLocation/:component_id", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE, Account_1.Role.CUSTOMER]), (req, res) => {
    inventoryManagementService
        .getComponentLocation(req.params.component_id)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
router.get("/locations/all", AuthenticationService_1.authenticateToken, (_, res) => {
    inventoryManagementService.getAllLocations().then((response) => {
        res.json(response);
    }).catch((error) => {
        res.status(500).send(error);
    });
});
exports.default = router;
