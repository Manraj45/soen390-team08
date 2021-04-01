// DEPENDENCIES
import express from "express";

// SERVICES
import { TriggerService } from "../services/triggerService/TriggerService";

const router = express();
const triggerService = new TriggerService();

router.get("/", (req, res) => {
    triggerService
    .getAllTriggers()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

router.put("/toggle/:id", (req, res) => {
    triggerService
    .toggleTrigger(req.params.id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

export default router;
