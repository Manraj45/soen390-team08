import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { BACKEND_PORT } from "./config/config";
import { initialize_db } from "./helpers/db_init";

//import routes
import accountReceivableRouter from "./routes/account_receivable_route";
import componentRouter from "./routes/component_routes";
import indexRouter from "./routes/index";
import registrationRouter from "./routes/registration_route";
<<<<<<< HEAD
import accountingRouter from "./routes/accouting_routes"
=======
import bikeRoutes from "./routes/bike_routes";

>>>>>>> bd7e82d (adding post qpis for bike creation)
//Configure dotenv
dotenv.config();

const app: Application = express();

//Initialize cors
app.use(cors());

//Initialize json parser
app.use(express.json());

//Setup routes
app.use("/", indexRouter);
app.use("/account_receivable", accountReceivableRouter);
app.use("/register", registrationRouter);
app.use("/components", componentRouter);
<<<<<<< HEAD
app.use("/finance", accountingRouter);
=======
app.use("/bike",bikeRoutes);
>>>>>>> bd7e82d (adding post qpis for bike creation)

const port = process.env.PORT || BACKEND_PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));

initialize_db();
