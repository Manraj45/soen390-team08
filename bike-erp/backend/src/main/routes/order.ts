import express from 'express';
import db from '../helpers/db';

const router = express();

// router.get('/', (req, res) => {
//     res.send('Yes');
//     // db.query( 'SELECT * FROM `component`', (err, rows) => {
//     //     if (err) throw err;
//     //     res.json(rows);
//     // });
// });

export default router;