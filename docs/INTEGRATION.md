# Frontend-Backend Integration Guide

## 🚀 Quick Start

### Option 1: Automatic Start (Recommended)
```bash
cd /Users/teyyyyyheng/doms
./start.sh
```

This will automatically:
- Start the backend on http://localhost:8000
- Start the frontend on http://localhost:3000
- Create necessary .env files if missing
- Install dependencies if needed

### Option 2: Manual Start

**Terminal 1 - Backend**:
```bash
cd doms_go
go run main.go
```

**Terminal 2 - Frontend**:
```bash
cd doms-frontend
pnpm dev   # or: npm run dev
```

### Stop the Servers
```bash
./stop.sh
```

## 📁 Project Structure

```
doms/
├── doms_go/              # Go backend
│   ├── main.go
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── .env
├── doms-frontend/        # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/        # ✨ Custom React hooks
│   │   ├── lib/
│   │   │   ├── api.ts    # 🔌 API client
│   │   │   ├── config.ts
│   │   │   └── errors.ts
│   │   └── types/
│   │       └── api.ts    # 📝 TypeScript types
│   └── .env
├── INTEGRATION.md        # This file
├── INTEGRATION_SETUP.md  # Detailed setup guide
├── start.sh              # Start both servers
├── stop.sh               # Stop both servers
└── test-integration.sh   # Test the integration
```

## 🔌 API Integration

### Available React Hooks

All hooks are located in `doms-frontend/src/hooks/`:

```typescript
import {
  useAuth,        // Authentication state management
  useLogin,       // Login & registration
  useLogout,      // Logout functionality
  useProfile,     // User profile operations
  useUsers,       // User management (admin)
  useRoles,       // Role management (admin)
  usePermissions, // Permissions (admin)
  usePipelines,   // Pipeline management (admin)
} from '@/hooks';
```

### Example: Login

```typescript
import { useLogin } from '@/hooks';

function LoginPage() {
  const { login, loading, error } = useLogin();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Token automatically stored
      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed');
    }
  };
}
```

### Example: Fetch Users

```typescript
import { useUsers } from '@/hooks';

function UserManagement() {
  const { users, loading, fetchUsers, suspendUser } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.email}
          <button onClick={() => suspendUser(user.id)}>
            Suspend
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Direct API Calls

If you prefer not to use hooks:

```typescript
import * as api from '@/lib/api';

// Get token from localStorage
const token = localStorage.getItem('jwt');

// Make API calls
const users = await api.getUsers(token);
const roles = await api.getRoles(token);
await api.createPipeline(data, token);
```

### Available API Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (requires auth)
- `POST /api/reset-password` - Password reset
- `POST /api/change-password` - Change password (requires auth)

#### User Management
- `GET /api/profile` - Get current user profile (requires auth)
- `PUT /api/profile` - Update user profile (requires auth)
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `POST /api/users/:id/suspend` - Suspend user (admin only)
- `POST /api/users/:id/unsuspend` - Unsuspend user (admin only)
- `POST /api/users/ban` - Ban user (admin only)
- `POST /api/users/assign-roles` - Assign roles to user (admin only)
- `POST /api/users/unassign-roles` - Unassign roles from user (admin only)

#### Role & Permission Management
- `POST /api/roles` - Create role (admin only)
- `GET /api/roles` - List roles (admin only)
- `GET /api/roles/:id` - Get role by ID (admin only)
- `PUT /api/roles/:id` - Update role (admin only)
- `POST /api/roles/:id/delete` - Delete role (admin only)
- `POST /api/roles/assign-permissions` - Assign permissions to role (admin only)
- `GET /api/roles/:id/permissions` - Get role permissions (admin only)
- `GET /api/permissions` - List all permissions (admin only)

#### Pipeline Management
- `POST /api/pipeline` - Create pipeline (admin only)
- `GET /api/pipelines` - List pipelines (admin only)
- `GET /api/pipelines/:id` - Get pipeline info (admin only)
- `PUT /api/pipelines/:id` - Update pipeline (admin only)
- `POST /api/pipelines/:id` - Delete pipeline (admin only)
- `POST /api/pipelines/assign-user` - Assign user to pipeline (admin only)
- `POST /api/pipelines/unassign-user` - Unassign user from pipeline (admin only)

## CORS Configuration

The backend is configured to allow requests from the frontend:

```go
config := cors.Config{
    AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
}
```

## Authentication Flow

1. **Login**: User submits credentials to `POST /api/login`
2. **Token**: Backend returns JWT token
3. **Storage**: Frontend stores token (typically in localStorage or cookies)
4. **Authorization**: Token is sent in `Authorization: Bearer <token>` header for protected routes
5. **Middleware**: Backend validates token using `AuthorizeUser()` middleware

## Development Workflow

### Running Both Servers

**Terminal 1 - Backend**:
```bash
cd doms_go
go run main.go
```

**Terminal 2 - Frontend**:
```bash
cd doms-frontend
npm run dev
```

### Testing the Integration

1. Open browser to `http://localhost:3000`
2. Try logging in or registering
3. Check browser DevTools Network tab to verify API calls to `http://localhost:8000`
4. Check backend terminal for incoming requests

## Production Considerations

### Environment Variables
Update the following for production:

**Backend (.env)**:
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` - Production database
- `WEB_URL` - Production frontend URL
- `MAIL_*` - Production email service

**Frontend (.env)**:
- `NEXT_PUBLIC_API_URL` - Production backend URL (e.g., `https://api.yourdomain.com`)

### CORS Configuration
Update CORS to allow only your production frontend domain:

```go
config := cors.Config{
    AllowOrigins: []string{"https://yourdomain.com"},
    // ... rest of config
}
```

### Security
- Use HTTPS in production
- Secure your JWT secret key
- Implement rate limiting
- Add input validation
- Use environment-specific configuration

## Troubleshooting

### Common Issues

1. **CORS errors**:
   - Verify backend CORS configuration includes frontend URL
   - Check that credentials are being sent if needed

2. **Connection refused**:
   - Ensure backend is running on port 8000
   - Check `NEXT_PUBLIC_API_URL` in frontend .env

3. **401 Unauthorized**:
   - Verify token is being sent in Authorization header
   - Check token hasn't expired
   - Ensure user has required permissions

4. **Database connection errors**:
   - Verify database is running
   - Check database credentials in backend .env
   - Ensure database exists and migrations have run

## Additional Resources

- Backend API documentation: See Postman collection at `doms_go/Go-DOMS.postman_collection.json`
- Frontend components: Located in `doms-frontend/src/components`
- API hooks: Located in `doms-frontend/src/hooks`
