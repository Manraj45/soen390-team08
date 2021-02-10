import mysql from 'mysql2';
import { DB_PASSWORD } from '../config/config';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'bike_erp'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database.");
});

export default db;