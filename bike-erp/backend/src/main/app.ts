import express, { Application, Request, Response } from 'express';
import indexRouter from './routes/index';
import accountReceivableRouter from './routes/account_receivable';
import cors from 'cors';
import { initialize_db } from './helpers/db_init';
import { BACKEND_PORT } from './config/config';

const app: Application = express();

//Initialize cors
app.use(cors());

//Setup routes
app.use('/', indexRouter);
app.use('/account_receivable', accountReceivableRouter);

const port = process.env.PORT || BACKEND_PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));

initialize_db()