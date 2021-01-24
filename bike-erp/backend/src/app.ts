import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) =>  {
    res.send('TEST');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));