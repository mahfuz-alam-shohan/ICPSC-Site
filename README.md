# School Management System

This project contains a frontend and backend for a modular school management system with role-based access control.

## Repository Structure
```
.
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── applications/
│   │   │   ├── attendance/
│   │   │   ├── auth/
│   │   │   ├── drivers/
│   │   │   ├── fees/
│   │   │   ├── librarians/
│   │   │   ├── officers/
│   │   │   ├── registrations/
│   │   │   ├── results/
│   │   │   ├── roles/
│   │   │   ├── staff/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   └── users/
│   │   └── utils/
└── frontend/
```

Each module exposes its own controller and route definition and is protected by JWT authentication and role-based authorization.

## Database

The backend uses a simple SQLite database stored at `database.sqlite` in the project root. Connection logic lives in `backend/src/config/db.ts` and is initialized automatically when the server starts.

To inspect or modify the database during development you can use any SQLite client, for example:

```
sqlite3 database.sqlite
```

Schemas are not yet defined—add tables as needed while expanding modules.
