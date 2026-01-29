import { ActionContext, type BenevoleUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"

export function BenevoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()

  if (!user || user.role !== 'BENEVOLE') {
    throw new Error('BenevoleProvider used with invalid user')
  }

  const value: BenevoleUser = {
    role: 'BENEVOLE',
  }

  return (
    <ActionContext.Provider value={value}>
      {children}
    </ActionContext.Provider>
  )
}
