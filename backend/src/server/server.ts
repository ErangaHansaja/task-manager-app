import dotenv from 'dotenv';
import path from 'path';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routers from '../routers';

dotenv.config({ path: path.resolve(__dirname, '../../env/.env') });

const app: Application = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

routers.forEach((router) => app.use('/api', router));

app.get('/', (req: Request, res: Response) => {
  res.send('Task Manager Backend is running!');
});

export default app;