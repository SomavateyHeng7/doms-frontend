# System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOMS Application                         │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐         ┌────────────────────────────┐
│      Frontend (Next.js)    │         │      Backend (Go/Gin)      │
│   http://localhost:3000    │◄───────►│   http://localhost:8000    │
└────────────────────────────┘  HTTP   └────────────────────────────┘
                                REST              │
                                API               │ GORM
                                                  ▼
                                        ┌────────────────────┐
                                        │   MySQL Database   │
                                        │   doms_db          │
                                        └────────────────────┘

Frontend Structure:
==================

src/
├── app/                    # Next.js pages
│   ├── login/             # Login page
│   ├── admin/             # Admin dashboard
│   ├── broker/            # Broker pages
│   └── officer/           # Officer pages
│
├── components/            # React components
│   ├── examples/          # Integration examples
│   │   ├── LoginExample.tsx
│   │   └── UserManagementExample.tsx
│   ├── admin/             # Admin components
│   └── shared/            # Shared components
│
├── hooks/                 # Custom React Hooks
│   ├── useAuth.ts         ────┐
│   ├── useLogin.ts        ────┤
│   ├── useLogout.ts       ────┤
│   ├── useProfile.ts      ────┤──► Manage State & API Calls
│   ├── useUsers.ts        ────┤
│   ├── useRoles.ts        ────┤
│   ├── usePermissions.ts  ────┤
│   └── usePipelines.ts    ────┘
│
├── lib/
│   ├── api.ts            ─────► Main API Client
│   ├── config.ts         ─────► Configuration
│   └── errors.ts         ─────► Error Handling
│
└── types/
    └── api.ts            ─────► TypeScript Types


Backend Structure:
==================

doms_go/
├── main.go                # Entry point
├── routes/
│   └── api_route.go      ─────► Route Definitions
│
├── controllers/
│   └── v1/
│       ├── auth/         ─────► Auth Controllers
│       ├── user/         ─────► User Controllers
│       ├── rolepermission/────► Role/Permission Controllers
│       └── pipeline_controller.go
│
├── middlewares/
│   └── auth_middleware.go ────► JWT Validation
│
├── models/               ─────► Database Models
│   ├── user.go
│   ├── role.go
│   ├── permission.go
│   └── pipeline.go
│
└── configs/
    └── db.go             ─────► Database Connection


API Flow:
=========

1. User Login Flow:
   ┌──────────┐  login()   ┌──────────┐  POST      ┌──────────┐
   │ Component│──────────►│ useLogin │─────────────►│ api.ts   │
   └──────────┘            └──────────┘  /api/login └──────────┘
                                                          │
                                                          ▼
   ┌──────────────┐        ┌───────────┐           ┌──────────┐
   │ localStorage │◄───────│  Response │◄──────────│ Backend  │
   │  - jwt       │  store │  - token  │  JWT      │ /api/login│
   │  - user      │  token │  - user   │           └──────────┘
   └──────────────┘        └───────────┘

2. Authenticated Request Flow:
   ┌──────────┐  fetchUsers() ┌──────────┐  GET + Token  ┌──────────┐
   │ Component│──────────────►│ useUsers │──────────────►│ api.ts   │
   └──────────┘                └──────────┘  /api/users   └──────────┘
                                                                │
                                                                ▼
   ┌──────────┐               ┌───────────┐              ┌──────────┐
   │ Component│◄──────────────│  Response │◄─────────────│ Backend  │
   │  users[] │  update state │  users[]  │  Validate    │ Middleware│
   └──────────┘               └───────────┘  JWT         └──────────┘

Authentication Middleware:
==========================

Request ──► AuthorizeUser() ──► Validate JWT ──► Extract User ──► Handler
                │                     │
                │                     ▼
                │              JWT Valid?
                │                 │    │
                │                Yes   No
                │                 │    │
                │                 │    ▼
                │                 │  401 Unauthorized
                │                 ▼
                │           Add User to Context
                │                 │
                ▼                 ▼
          NotBanUserOnly()   Continue to Handler


Available Hooks & Their Functions:
===================================

useAuth
  ├── isAuthenticated
  ├── user
  ├── token
  ├── login()
  ├── logout()
  └── getToken()

useLogin
  ├── login()
  ├── register()
  ├── loading
  └── error

useUsers (Admin)
  ├── users[]
  ├── fetchUsers()
  ├── getUser()
  ├── updateUser()
  ├── suspendUser()
  ├── unsuspendUser()
  ├── banUser()
  ├── assignRoles()
  └── unassignRoles()

useRoles (Admin)
  ├── roles[]
  ├── fetchRoles()
  ├── createRole()
  ├── updateRole()
  ├── deleteRole()
  ├── assignPermissions()
  └── getRolePermissions()

usePipelines (Admin)
  ├── pipelines[]
  ├── fetchPipelines()
  ├── createPipeline()
  ├── updatePipeline()
  ├── deletePipeline()
  ├── assignUser()
  └── unassignUser()


Environment Variables:
======================

Backend (.env):
  DB_USER, DB_PASS, DB_HOST, DB_NAME
  MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD
  WEB_URL, BACKEND_URL
  AUTO_MIGRATE, RUN_SEEDER

Frontend (.env.local):
  NEXT_PUBLIC_API_URL=http://localhost:8000



Quick Start:
============

1. cd /Users/teyyyyyheng/doms
2. ./start.sh
3. Open http://localhost:3000
4. Test login functionality
5. Explore admin features
```
