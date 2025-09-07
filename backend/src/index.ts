import app from './server/server';
import { mongoDBConnection } from './db/mongoConnection';

(async () => {
  try {
    await mongoDBConnection();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (e) {
    console.error('MongoDB connection failed:', (e as Error).message);
  }
})();