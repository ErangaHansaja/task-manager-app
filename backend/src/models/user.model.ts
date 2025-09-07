import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const UserModel = model<User>('User', UserSchema);