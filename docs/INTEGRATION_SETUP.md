# Frontend-Backend Integration Setup

## Quick Start Guide

### 1. Backend Setup (Go)

```bash
cd doms_go

# Copy and configure environment
cp .env.example .env
# Edit .env with your database credentials

# Install dependencies
go mod download

# Run the server
go run main.go
```

Backend will run on: `http://localhost:8000`

### 2. Frontend Setup (Next.js)

```bash
cd doms-frontend

# Install dependencies
pnpm install
# or: npm install

# Create .env.local if not exists
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run the development server
pnpm dev
# or: npm run dev
```

Frontend will run on: `http://localhost:3000`

## Project Structure

### Backend (Go)
```
doms_go/
├── main.go                 # Entry point
├── routes/
│   └── api_route.go       # API routes definition
├── controllers/           # Request handlers
├── models/               # Database models
├── middlewares/          # Auth & other middleware
└── .env                  # Environment configuration
```

### Frontend (Next.js)
```
doms-frontend/
├── src/
│   ├── app/             # Next.js 13+ app directory
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts   # Authentication hook
│   │   ├── useLogin.ts  # Login functionality
│   │   ├── useUsers.ts  # User management
│   │   ├── useRoles.ts  # Role management
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts       # API client functions
│   │   ├── config.ts    # Configuration
│   │   └── errors.ts    # Error handling
│   └── types/
│       └── api.ts       # TypeScript types
└── .env.local           # Environment variables
```

## API Integration

### Using API Functions

All API calls are available through the `lib/api.ts` module:

```typescript
import * as api from '@/lib/api';

// Authentication
const loginData = await api.login(email, password);
const registerData = await api.register(userData);
await api.logout(token);

// User Management
const users = await api.getUsers(token);
const user = await api.getUser(userId, token);
await api.updateUser(userId, userData, token);
await api.suspendUser(userId, token);

// Role Management
const roles = await api.getRoles(token);
await api.createRole(roleData, token);
await api.updateRole(roleId, roleData, token);

// Pipeline Management
const pipelines = await api.getPipelines(token);
await api.createPipeline(pipelineData, token);
```

### Using Hooks

React hooks provide state management for API calls:

```typescript
import { useAuth, useUsers, useRoles } from '@/hooks';

function MyComponent() {
  // Authentication
  const { user, isAuthenticated, login, logout } = useAuth();

  // Users
  const { users, loading, error, fetchUsers, updateUser } = useUsers();

  // Roles
  const { roles, createRole, deleteRole } = useRoles();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // ... rest of component
}
```

## Authentication Flow

1. **Login**
   ```typescript
   import { useLogin } from '@/hooks';
   
   const { login, loading, error } = useLogin();
   
   const handleLogin = async () => {
     try {
       const data = await login(email, password);
       // Token is automatically stored in localStorage
       // Redirect to dashboard
     } catch (err) {
       console.error('Login failed:', err);
     }
   };
   ```

2. **Protected Routes**
   ```typescript
   import { useAuth } from '@/hooks';
   import { useRouter } from 'next/navigation';
   
   export default function ProtectedPage() {
     const { isAuthenticated, isLoading } = useAuth();
     const router = useRouter();
   
     useEffect(() => {
       if (!isLoading && !isAuthenticated) {
         router.push('/login');
       }
     }, [isAuthenticated, isLoading]);
   
     if (isLoading) return <div>Loading...</div>;
     if (!isAuthenticated) return null;
   
     return <div>Protected Content</div>;
   }
   ```

3. **Logout**
   ```typescript
   import { useLogout } from '@/hooks';
   
   const logout = useLogout();
   
   <button onClick={logout}>Logout</button>
   ```

## Available Endpoints

### Public Routes
- `POST /api/register` - User registration
- `POST /api/login` - User login  
- `POST /api/reset-password` - Password reset

### Protected Routes (Requires Authentication)
- `POST /api/logout` - User logout
- `POST /api/change-password` - Change password
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Admin Routes (Requires Admin Role)

#### User Management
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `POST /api/users/:id/suspend` - Suspend user
- `POST /api/users/:id/unsuspend` - Unsuspend user
- `POST /api/users/ban` - Ban user
- `POST /api/users/assign-roles` - Assign roles to user
- `POST /api/users/unassign-roles` - Remove roles from user

#### Role Management
- `POST /api/roles` - Create role
- `GET /api/roles` - List all roles
- `GET /api/roles/:id` - Get role details
- `PUT /api/roles/:id` - Update role
- `POST /api/roles/:id/delete` - Delete role
- `POST /api/roles/assign-permissions` - Assign permissions to role
- `GET /api/roles/:id/permissions` - Get role permissions
- `GET /api/permissions` - List all permissions

#### Pipeline Management
- `POST /api/pipeline` - Create pipeline
- `GET /api/pipelines` - List all pipelines
- `GET /api/pipelines/:id` - Get pipeline details
- `PUT /api/pipelines/:id` - Update pipeline
- `POST /api/pipelines/:id` - Delete pipeline
- `POST /api/pipelines/assign-user` - Assign user to pipeline
- `POST /api/pipelines/unassign-user` - Remove user from pipeline

## Environment Variables

### Backend (.env)
```env
# Database
DB_USER=root
DB_PASS=root
DB_HOST=127.0.0.1:3306
DB_NAME=doms_db

# Server
BACKEND_URL=127.0.0.1:8000/api

# Email (Mailtrap)
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password

# Frontend URL
WEB_URL=http://localhost:3000

# Auto Migration
AUTO_MIGRATE=true
RUN_SEEDER=true
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## CORS Configuration

The backend is pre-configured to allow requests from:
- `http://localhost:3000` (Frontend dev server)
- `http://localhost:8000` (Backend server)

For production, update `routes/api_route.go`:

```go
config := cors.Config{
    AllowOrigins: []string{"https://yourdomain.com"},
    // ... rest of config
}
```

## Error Handling

All API functions throw errors that can be caught:

```typescript
import { getErrorMessage } from '@/lib/errors';

try {
  await api.updateUser(userId, userData, token);
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message);
  // Show error to user
}
```

## TypeScript Types

All API responses are typed. Import types from `@/types/api`:

```typescript
import type { User, Role, Pipeline } from '@/types/api';

const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
};
```

## Testing the Integration

### 1. Start both servers
```bash
# Terminal 1 - Backend
cd doms_go && go run main.go

# Terminal 2 - Frontend  
cd doms-frontend && pnpm dev
```

### 2. Test authentication
- Visit `http://localhost:3000/login`
- Try logging in with test credentials
- Check browser DevTools Network tab for API calls

### 3. Check backend logs
- Backend should show incoming requests
- Verify CORS headers are correct

## Common Issues

### Connection Refused
- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` is set correctly

### CORS Errors
- Verify frontend URL in backend CORS config
- Check browser console for specific error

### 401 Unauthorized
- Token may have expired
- Verify token is being sent in Authorization header
- Check user has required permissions

### Database Errors
- Ensure MySQL is running
- Verify database credentials in `.env`
- Check if migrations have run (`AUTO_MIGRATE=true`)

## Production Deployment

### Backend
1. Set production environment variables
2. Use production database
3. Configure production email service
4. Update CORS to allow only production domain
5. Use HTTPS

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to production API
2. Build for production: `pnpm build`
3. Deploy build output
4. Configure HTTPS

## Additional Resources

- **Postman Collection**: `doms_go/Go-DOMS.postman_collection.json`
- **Backend Documentation**: See `doms_go/README.md`
- **Frontend Documentation**: See `doms-frontend/README.md`
