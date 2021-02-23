import express, { Application } from 'express';
import cors from 'cors';
import { AUTH_PORT } from '../../config/config';
import authentication_route from '../../routes/authentication_route';
import dotenv from 'dotenv';

//Configure dotenv
dotenv.config();

const app: Application = express();

//Initialize cors
app.use(cors());

//Initialize json parser
app.use(express.json());

//Setup routes
app.use('/auth', authentication_route);

//Starting authentication server on defined port
const port = process.env.PORT || AUTH_PORT;
app.listen(port, () => console.log(`Auth Server started on port ${port}`));
