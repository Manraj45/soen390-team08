"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// SERVICES
const config_1 = require("../../config/config");
const authentication_route_1 = __importDefault(require("../../routes/authentication_route"));
//Configure dotenv
dotenv_1.default.config();
const app = express_1.default();
//Initialize cors
app.use(cors_1.default());
//Initialize json parser
app.use(express_1.default.json());
//Setup routes
app.use("/auth", authentication_route_1.default);
//Starting authentication server on defined port
const port = process.env.PORT || config_1.AUTH_PORT;
app.listen(port, () => console.log(`Auth Server started on port ${port}`));
