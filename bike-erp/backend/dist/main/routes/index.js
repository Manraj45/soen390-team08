"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
router.get("/", (req, res) => {
    res.json({
        name: "bike_erp",
        version: "1.0",
    });
});
exports.default = router;
