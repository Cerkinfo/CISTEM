import { ActionContext, type AdminUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()

  if (!user || user.role !== 'ADMIN') {
    throw new Error('AdminProvider used with non-admin user')
  }

  const value: AdminUser = {
    role: 'ADMIN',
  }

  return (
    <ActionContext.Provider value={value}>
      {children}
    </ActionContext.Provider>
  )
}
