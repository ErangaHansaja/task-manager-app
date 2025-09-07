import mongoose from 'mongoose';

const { DB_USER, DB_PASS, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@taskmanagercluster.zm7vs90.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

export const mongoDBConnection = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log('MongoDB connected. Version:', connection.version);
    return connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};