import { ThemeProvider } from "@/components/mode/theme-provider"
import "../globals.css"

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
