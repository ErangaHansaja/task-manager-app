# Task Manager App 🚀

A modern full-stack **Task Manager** application with a **Node.js + TypeScript backend** (Express, MongoDB) and an **Angular 16 frontend** (Angular Material). Built for clarity, scalability and a professional developer experience — ready for local development and production deployment.

---

## 🚩 Project Summary

- **Backend**: Node.js, TypeScript, Express, Mongoose, JWT auth, bcrypt, MongoDB Atlas.
- **Frontend**: Angular 16, TypeScript, Angular Material, GSAP + AOS animations.
- **Features**: User registration/login, JWT-protected task CRUD (create, read, update, delete), responsive UI for managing tasks.

---

## 📋 Features

### Backend
- User register & login endpoints (`/api/auth`) with hashed passwords and JWT issuance.
- Task endpoints (`/api/task/task`) protected by authentication middleware.
- MongoDB Atlas integration via connection string in `.env`.

### Frontend
- Login & Registration pages.
- Dashboard for task listing + create/edit/delete flows.
- Material UI components and responsive layout.
- Page transitions/animations (AOS, GSAP) for polish.

---

## 🛠️ Tech Stack

**Backend**: Node.js, TypeScript, Express, Mongoose, JWT, bcrypt, nodemon (dev)  
**Frontend**: Angular 16, Angular Material, RxJS, GSAP, AOS

---

## 🚀 Quickstart (Local Development)

> Clone the repo, configure env files, install dependencies, then run backend & frontend concurrently.

```bash
# Clone
git clone https://github.com/<your-username>/task-manager-app.git
cd task-manager-app
```

### Backend

```bash
cd backend
npm install
# Copy the env template (Windows / macOS/Linux)
# Windows
copy env\.env.template env\.env
# macOS / Linux
cp env/.env.template env/.env

# Edit env/.env and fill in your MongoDB Atlas credentials and JWT secret
# Start in dev with nodemon
npm run dev
```

Default backend URL: `http://localhost:3000` (API root: `http://localhost:3000/api`)

### Frontend

```bash
cd ../frontend
npm install
# Optionally update API URL in environment files
# src/environments/environment.ts
# src/environments/environment.prod.ts

# Add Angular Material if missing
ng add @angular/material

# Run dev server
ng serve
```

Default frontend URL: `http://localhost:4200`

---

## ⚙️ Environment Configuration

`backend/env/.env` (example)

```env
DB_USER=your_atlas_user
DB_PASS=your_atlas_password
DB_NAME=task-manager
JWT_SECRET=your_secure_jwt_secret_32_chars_minimum
PORT=3000
```

`frontend/src/environments/environment.ts` (example)

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

---

## 🔌 API Endpoints (examples)

**Auth**

- `POST /api/auth/register` — Register a new user
  - Body (JSON): `{ "email": "test@example.com", "password": "password123" }`

- `POST /api/auth/login` — Login and receive JWT
  - Body (JSON): `{ "email": "test@example.com", "password": "password123" }`
  - Response: `{ token: "<jwt>" }`

**Tasks** (Require `Authorization: Bearer <token>` header)

- `GET /api/task/task` — Get all tasks for logged-in user
- `POST /api/task/task` — Create a task
  - Body example: `{ "title": "Buy groceries", "description": "Milk, Eggs", "dueDate": "2025-10-01" }`
- `GET /api/task/task/:id` — Get a task by id
- `PUT /api/task/task/:id` — Update a task
- `DELETE /api/task/task/:id` — Delete a task

cURL example (create task):

```bash
curl -X POST http://localhost:3000/api/task/task \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Plan trip","description":"Book flights","dueDate":"2025-11-01"}'
```

---

## 📂 Project Structure

```
task-manager-app/
├── backend/
│   ├── env/                 # Environment configs (.env.template)
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── db/              # MongoDB connection logic
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── middlewares/     # Auth middleware (JWT verify)
│   │   ├── models/          # Mongoose schemas (User, Task)
│   │   ├── routers/         # API routes (auth, task)
│   │   ├── server/          # Express app setup
│   │   ├── types/           # Custom TS types
│   │   └── index.ts         # App entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/        # Login/register components
│   │   │   ├── dashboard/   # Task management UI
│   │   │   ├── layouts/     # Main layouts (nav, sidebar)
│   │   │   ├── services/    # API services (auth, task)
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/    # environment.ts
│   │   └── styles.scss
│   ├── angular.json
│   └── package.json
├── README.md
├── .github/workflows/dev.yml
```

---

## 🧪 Testing & Debugging

- Use **Postman** or **Insomnia** to test backend endpoints and confirm headers/response.
- Common checks:
  - Ensure `Authorization` header uses `Bearer <token>`.
  - Confirm `env/.env` credentials match Atlas user & cluster.
  - Run `tsc --noEmit` in backend to find TS compile errors.
  - Check browser console for frontend runtime errors.

---

## ⚠️ Troubleshooting (common issues)

- **MongoDB connection errors**: Verify `DB_USER`, `DB_PASS`, `DB_NAME` and Atlas IP access / network settings.
- **TypeScript errors**: Run `npx tsc --noEmit` to show issues.
- **Frontend fails to call API**: Confirm `environment.apiUrl` matches backend URL and CORS is enabled on backend.
- **Animations not running**: Ensure you import and initialize AOS and GSAP correctly (e.g., call `AOS.init()` and `AOS.refreshHard()` where appropriate).
- **Material components missing**: Ensure each feature module imports required Material modules (e.g., `MatToolbarModule`, `MatButtonModule`).

---

## ✅ Scripts (examples)

**Backend `package.json` (scripts)**

```json
{
  "scripts": {
    "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node -r tsconfig-paths/register src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```

**Frontend** uses the Angular CLI scripts (e.g., `ng serve`, `ng build`).

---

## 🤝 Contributing

Contributions are welcome! Typical workflow:
1. Fork the repo
2. Create a feature branch
3. Open a Pull Request with a clear description and screenshots (if UI changes)

Please run linters and tests before submitting.

---

## 📄 License

This project is provided under the **MIT License**. See `LICENSE` for details.

---
