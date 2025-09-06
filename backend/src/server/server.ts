import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

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
    const mongoURI = 'mongodb+srv://erangahansaja222_db_user:gDJwIbrBV6QWfDzf@taskmanagercluster.zm7vs90.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster';
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