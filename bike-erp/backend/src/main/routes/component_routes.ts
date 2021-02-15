import express from 'express';
import db from '../helpers/db';
import { InventoryManagementService } from '../services/inventoryManagementService/InventoryManagementService';

const router = express();
const inventoryManagementService = new InventoryManagementService();

router.get('/', (req, res) => {
    inventoryManagementService.getAllComponents().then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

router.get('/:component_id', (req, res) => {
    inventoryManagementService.getComponent(req.params.component_id).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

router.put('/updateQuantity', (req, res) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    inventoryManagementService.editComponent(id, quantity).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

router.get('/componentLocation/:component_id', (req, res) => {
    inventoryManagementService.getComponentLocation(req.params.component_id).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

export default router;