import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<insert your own pw here>',
    database: 'bike_erp'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database.");
});

export default db;