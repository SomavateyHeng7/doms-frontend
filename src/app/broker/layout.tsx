import { ThemeProvider } from "@/components/mode/theme-provider"
import "../globals.css"

export default function BrokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
