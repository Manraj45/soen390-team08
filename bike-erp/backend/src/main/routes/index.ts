import express from 'express';

const router = express();

router.get('/', (req, res) => {
    res.json({
        name: "bike_erp",
        version: "1.0",
    });
});

export default router;