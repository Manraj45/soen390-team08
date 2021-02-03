import express from 'express';
import db from '../helpers/db';
import { InventoryManagementService } from '../services/inventoryManagementService/InventoryManagementService';

const router = express();
const inventoryManagementService = new InventoryManagementService();

router.post('/', (req, res) => {
    inventoryManagementService.addComponent(req.body).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

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

router.put('/:component_id', (req, res) => {
    inventoryManagementService.editComponent(req.params.component_id, req.body).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

router.delete('/:component_id', (req, res) => {
    inventoryManagementService.removeComponent(req.params.component_id).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

router.delete('/', (req, res) => {
    inventoryManagementService.removeAllComponents().then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
});

export default router;