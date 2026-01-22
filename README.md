
# OfficeSync Document Management System

OfficeSync is a modern, full-featured document management system built with Next.js, React, and Tailwind CSS. It provides a professional dashboard for admins, officers, brokers, and users to manage, approve, and organize documents efficiently.

## Features

- **Role-based Dashboard**: Admin, Officer, Broker, and User dashboards with tailored navigation and permissions.
- **Animated Sidebar**: Collapsible, role-aware sidebar with smooth transitions.
- **Modern UI**: Clean, responsive design using Tailwind CSS and Lucide React icons.
- **Authentication**: Login, register, and request-join flows.
- **Document Management**: Upload, organize, and manage documents with approval workflows.
- **Quick Actions & Activity Feed**: Fast access to common actions and recent activity.
- **Dark/Light Mode**: Theme toggle for user preference.
- **Accessibility**: Keyboard navigation and accessible components.

## Tech Stack

- [Next.js 15+ (App Router)](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [framer-motion](https://www.framer.com/motion/) (sidebar animation)
- [next-themes](https://github.com/pacocoursey/next-themes) (theme toggling)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation
```bash
pnpm install
# or
npm install
```

### Development
```bash
pnpm run dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
pnpm run build
pnpm start
```

## Project Structure

```
public/
	image/           # Logos and illustrations
src/
	app/             # Next.js app directory (App Router)
		(dashboard)/   # Dashboard pages and layout
		components/    # Shared React components
		lib/           # Utility functions
```

## Customization
- **Logo**: Replace `/public/image/logo.jpeg` for your brand.
- **Sidebar Links**: Edit `src/components/sidebar.tsx` for navigation.
- **Theme**: Adjust Tailwind config or use next-themes for more options.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

© 2025 OfficeSync. All rights reserved.

how to run backend
cd doms_go
go run main.go

how to run frontend
cd doms-frontend
npm run dev  # or pnpm dev