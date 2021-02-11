import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { initialize_db } from './helpers/db_init';
import { BACKEND_PORT } from './config/config';
import dotenv from 'dotenv';

//import routes
import indexRouter from './routes/index';
import accountReceivableRouter from './routes/account_receivable_route';
import registrationRouter from './routes/registration_route';

//Configure dotenv
dotenv.config();

const app: Application = express();

//Initialize cors
app.use(cors());

//Initialize json parser
app.use(express.json());

//Setup routes
app.use('/', indexRouter);
app.use('/account_receivable', accountReceivableRouter);
app.use('/register', registrationRouter);

const port = process.env.PORT || BACKEND_PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));

initialize_db();