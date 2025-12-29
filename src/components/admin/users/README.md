# User Management Components

This directory contains all components related to user management functionality.

## Structure

```
src/components/admin/users/
├── index.ts                        # Barrel export for all components
├── InviteUserDialog.tsx            # Dialog for inviting new users
├── EditUserDialog.tsx              # Dialog for editing user details
├── DeleteUserDialog.tsx            # Dialog for deleting users
├── AssignRoleDialog.tsx            # Dialog for assigning roles to users
└── UserManagementGuideDialog.tsx   # Help dialog with usage guide
```

## Components

### InviteUserDialog

- **Purpose**: Invite a new user to the system
- **Features**:
  - Name input field
  - Email input field
  - Role selection dropdown
  - Form validation (required fields)
  - Auto-focus on first input
  - Disabled submit when invalid

### EditUserDialog

- **Purpose**: Edit existing user details
- **Features**:
  - Pre-populated with current user data
  - Name editing
  - Status toggle (Active/Suspended)
  - Role selection
  - Form validation
  - Same UI consistency as other dialogs

### DeleteUserDialog

- **Purpose**: Delete a user with confirmation
- **Features**:
  - Warning icon and red color scheme
  - Shows user name being deleted
  - Lists consequences of deletion
  - Prominent warning message
  - Two-step confirmation

### AssignRoleDialog

- **Purpose**: Assign roles to a user
- **Features**:
  - Search functionality for roles
  - Multiple role selection (checkboxes)
  - Shows selected count
  - Role list with name
  - Empty state for no roles
  - User name display in header

### UserManagementGuideDialog

- **Purpose**: Contextual help for user management
- **Features**:
  - Lists key user management features
  - Helpful tip at bottom
  - Clean, readable bullet points
  - Professional info icon

## Usage

Import from the index file for cleaner imports:

```tsx
import {
  InviteUserDialog,
  EditUserDialog,
  DeleteUserDialog,
  AssignRoleDialog,
  UserManagementGuideDialog,
} from "@/components/admin/users";
```

Or import individually:

```tsx
import InviteUserDialog from "@/components/admin/users/InviteUserDialog";
```

## Design Principles

1. **Consistent Dialog Structure**: All dialogs use the same shadcn Dialog component
2. **Form-based Dialogs**: Proper form submission with validation
3. **Proper Validation**: Disabled states for invalid inputs
4. **Accessible**: Proper labels, focus management, keyboard support
5. **Responsive**: Mobile-friendly sizing and layouts
6. **Consistent Styling**:
   - Same button styles across dialogs
   - Consistent spacing (gap-3, space-y-4, etc.)
   - Same border radius (rounded-lg)
   - Consistent colors (gray-800/black for primary, red-600 for delete, green-600 for success)

## Color Scheme

- **Primary Actions**: `bg-gray-800` (black-ish) / `bg-black`
- **Destructive Actions**: `bg-red-600`
- **Success Actions**: `bg-green-600`
- **Cancel/Secondary**: `border border-gray-300`
- **Disabled**: `opacity-50` with `cursor-not-allowed`

## State Management

The parent component (`/app/admin/users/page.tsx`) maintains:

- Dialog open/close states
- Selected user data
- Form submission handlers
- Toast notifications for user feedback

## Integration Example

```tsx
export default function UsersPage() {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleInviteUser = (data: {
    name: string;
    email: string;
    role: string;
  }) => {
    // Create new user
    // Show success toast
    setShowInviteDialog(false);
  };

  return (
    <>
      <button onClick={() => setShowInviteDialog(true)}>Invite User</button>

      <InviteUserDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onSubmit={handleInviteUser}
      />
    </>
  );
}
```

## Future Enhancements

- [ ] Add loading states for async operations
- [ ] Add email validation with real-time feedback
- [ ] Implement bulk user operations
- [ ] Add user import/export functionality
- [ ] Add user profile picture upload in invite/edit dialogs
- [ ] Add role permission preview in assign dialog
- [ ] Implement user activity history view
