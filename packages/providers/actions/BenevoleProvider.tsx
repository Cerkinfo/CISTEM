import { ActionContext, type BenevoleUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"

export function BenevoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()

  if (!user) {
    throw new Error('BenevoleProvider used with invalid user')
  }

  const value: BenevoleUser = {
    role: user?.role,
  }

  return (
    <ActionContext.Provider value={value}>
      {children}
    </ActionContext.Provider>
  )
}
