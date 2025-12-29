# Pipeline Components

This directory contains all components related to pipeline management functionality.

## Structure

```
src/components/admin/pipelines/
├── index.ts                      # Barrel export for all components
├── CreatePipelineDialog.tsx      # Dialog for creating new pipelines
├── EditPipelineDialog.tsx        # Dialog for editing pipeline names
├── DeletePipelineDialog.tsx      # Dialog for deleting pipelines
├── AssignUsersDialog.tsx         # Dialog for assigning users to pipelines
└── PipelineManagementGuide.tsx   # Info panel with usage guide
```

## Components

### CreatePipelineDialog

- **Purpose**: Create a new pipeline
- **Features**:
  - Form validation (required pipeline name)
  - Auto-focus on input field
  - Disabled submit when empty
  - Consistent button styling

### EditPipelineDialog

- **Purpose**: Edit existing pipeline name
- **Features**:
  - Pre-populated with current pipeline name
  - Form validation
  - Same UI consistency as Create dialog

### DeletePipelineDialog

- **Purpose**: Delete a pipeline with confirmation
- **Features**:
  - Warning icon and red color scheme
  - Lists what will be deleted
  - Prominent warning message
  - Displays pipeline name being deleted

### AssignUsersDialog

- **Purpose**: Assign users to pipeline approval workflow
- **Features**:
  - Search functionality for users
  - Checkbox selection
  - Shows selected count
  - User list with name, email, and role
  - Empty state for no users

### PipelineManagementGuide

- **Purpose**: Contextual help panel
- **Features**:
  - Toggle on/off
  - Click outside to close
  - Lists key pipeline features
  - Helpful tip at bottom

## Usage

Import from the index file for cleaner imports:

```tsx
import {
  CreatePipelineDialog,
  EditPipelineDialog,
  DeletePipelineDialog,
  AssignUsersDialog,
  PipelineManagementGuide,
} from "@/components/admin/pipelines";
```

Or import individually:

```tsx
import CreatePipelineDialog from "@/components/admin/pipelines/CreatePipelineDialog";
```

## Design Principles

1. **Consistent Dialog Structure**: All dialogs use the same shadcn Dialog component
2. **Form-based Dialogs**: Create and Edit use `<form>` with submit handlers
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

## Future Enhancements

- [ ] Add loading states for async operations
- [ ] Add confirmation dialog for unsaved changes
- [ ] Implement drag-and-drop for user order in AssignUsersDialog
- [ ] Add bulk operations for pipelines
- [ ] Add export/import pipeline configurations
