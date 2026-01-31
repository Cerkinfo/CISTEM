import { useSession } from "@pkg/hooks/ctx"
import { AdminProvider } from "./actions/AdminProvider"
import { BenevoleProvider } from "./actions/BenevoleProvider"
import { ManagerBarProvider } from "./actions/ManagerBarProvider"

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession()

  if (isLoading) return null
  if (!user) return null

  return <ManagerBarProvider>{children}</ManagerBarProvider>
}
