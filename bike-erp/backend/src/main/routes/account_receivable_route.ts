import express from 'express';
import db from '../helpers/db';

const router = express();


//EXAMPLE OF REQUEST
router.get('/', (req, res) => {
    db.query( 'SELECT * FROM `account_receivable`', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

export default router;