import mysql from "mysql2";
import fs from 'fs'
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "../config/config";

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  authSwitchHandler:function(data, cb) { console.log(data);console.log("bob")},
});

db.connect(function (err) {
  if (err) throw err;
});

export default db;
