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
