import { Sidebar } from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-[#dbdbdb] min-h-screen">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
