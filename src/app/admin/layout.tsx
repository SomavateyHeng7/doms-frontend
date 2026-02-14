"use client"

import { useRequireAuth } from "@/contexts/AuthContext";
import ConditionalLayout from "@/components/layout/conditionalLayout";
import { ThemeProvider } from "@/components/mode/theme-provider";
import "../globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useRequireAuth('/login');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </ThemeProvider>
  );
}
