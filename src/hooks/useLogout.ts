import { useCallback } from "react"

export function useLogout() {
  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    }
  }, [])

  return handleLogout
}
