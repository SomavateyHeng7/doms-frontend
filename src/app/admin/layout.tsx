import ConditionalLayout from "@/components/layout/conditionalLayout";
import { ThemeProvider } from "@/components/mode/theme-provider";
import "../globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </ThemeProvider>
  );
}
