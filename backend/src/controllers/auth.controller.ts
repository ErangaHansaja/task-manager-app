import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }
      const user = new UserModel({ email, password });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key', {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}