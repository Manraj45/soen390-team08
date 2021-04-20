"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const db_init_1 = require("./helpers/db_init");
// Import routes
const component_routes_1 = __importDefault(require("./routes/component_routes"));
const index_1 = __importDefault(require("./routes/index"));
const registration_route_1 = __importDefault(require("./routes/registration_route"));
const account_management_route_1 = __importDefault(require("./routes/account_management_route"));
const accouting_routes_1 = __importDefault(require("./routes/accouting_routes"));
const bike_routes_1 = __importDefault(require("./routes/bike_routes"));
const user_logs_routes_1 = __importDefault(require("./routes/user_logs_routes"));
const email_routes_1 = __importDefault(require("./routes/email_routes"));
const triggers_routes_1 = __importDefault(require("./routes/triggers_routes"));
// Configure dotenv
dotenv_1.default.config();
const app = express_1.default();
// Initialize cors
app.use(cors_1.default());
// Initialize json parser
app.use(express_1.default.json());
// Setup routes
app.use("/", index_1.default);
app.use("/register", registration_route_1.default);
app.use("/components", component_routes_1.default);
app.use("/account_management", account_management_route_1.default);
app.use("/finance", accouting_routes_1.default);
app.use("/bike", bike_routes_1.default);
app.use("/userlogs", user_logs_routes_1.default);
app.use("/email", email_routes_1.default);
app.use("/triggers", triggers_routes_1.default);
const port = process.env.PORT || config_1.BACKEND_PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
db_init_1.initialize_db();
