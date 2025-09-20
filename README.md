# Task Manager Backend 🚀

A modern REST API built with **TypeScript**, **Express**, and **MongoDB** for managing user-specific tasks with JWT authentication. Structured for scalability and inspired by professional backend setups.

## 📋 Description
- **Features**: User registration/login (`/api/auth`), task CRUD operations (`/api/task/task`), JWT-based authentication, MongoDB Atlas storage.
- **Tech Stack**: Node.js, TypeScript, Express, Mongoose, JWT, bcrypt.

## 🛠️ Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/task-manager-app.git
   cd task-manager-app/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Copy `env/.env.template` to `env/.env`:
     ```bash
     copy env\.env.template env\.env
     ```
   - Edit `env/.env` with MongoDB Atlas credentials and JWT secret:
     ```env
     DB_USER=your_atlas_username
     DB_PASS=your_atlas_password
     DB_NAME=task-manager
     JWT_SECRET=your_secure_jwt_secret_32_chars_minimum
     ```

## 🚀 Run the Project
1. **Development Mode** (with nodemon):
   ```bash
   npm run dev
   ```
   - Starts server at `http://localhost:3000`.

2. **Production Mode**:
   ```bash
   npm run start
   ```
   - Compiles TypeScript and runs the built app.

## 🧪 Test APIs
Use **Postman** to test:
- **Register**: `POST http://localhost:3000/api/auth/register`
  ```json
  {"email":"test@example.com","password":"password123"}
  ```
- **Login**: `POST http://localhost:3000/api/auth/login` (get token)
- **Tasks** (use `Authorization: Bearer <token>`):
  - Create: `POST http://localhost:3000/api/task/task`
  - Get All: `GET http://localhost:3000/api/task/task`
  - Get/Update/Delete by ID: `GET/PUT/DELETE http://localhost:3000/api/task/task/<task-id>`

## 📂 Project Structure
```
backend/
├── env/                 # Environment configs
├── src/
│   ├── controllers/     # API logic
│   ├── db/             # MongoDB connection
│   ├── interfaces/     # TypeScript interfaces
│   ├── middlewares/    # Authentication middleware
│   ├── models/         # Mongoose schemas
│   ├── routers/        # API routes
│   ├── server/         # Express server setup
│   ├── types/          # Custom TypeScript types
│   ├── index.ts        # App entry point
├── package.json
├── tsconfig.json
├── README.md
```

## 🔧 Troubleshooting
- **MongoDB Error**: Verify `env/.env` credentials and Atlas cluster.
- **TypeScript Error**: Run `tsc --noEmit` to diagnose.
- **API Error**: Check Postman headers and server logs.