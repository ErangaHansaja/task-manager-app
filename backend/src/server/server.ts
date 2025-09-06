import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from env/.env
dotenv.config({ path: './env/.env' });

class App {
  private app: Application;
  private port: number = 3000;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupMongoDB();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Task Manager Backend is running!');
    });
  }

  private setupMongoDB(): void {
    const dbUser = process.env.DB_USER || 'default_user';
    const dbPass = process.env.DB_PASS || 'default_pass';
    const dbName = process.env.DB_NAME || 'task-manager';
    const mongoURI = `mongodb+srv://${dbUser}:${dbPass}@taskmanagercluster.zm7vs90.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;
    mongoose
      .connect(mongoURI)
      .then(() => console.log('Connected to MongoDB Atlas'))
      .catch((err) => console.error('MongoDB Atlas connection error:', err));
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

const app = new App();
app.start();