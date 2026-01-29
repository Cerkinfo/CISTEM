import { ActionContext, type ManagerBarUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"
import type { Order } from "@pkg/types/Order"
import type { SellPoint } from "@pkg/types/SellPoint"
import { useState } from "react"

export function ManagerBarProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const [order, setOrder] = useState<Order>([])
  const [sellPoint, setSellPoint] = useState<SellPoint>({ id: '00', orders_quantity: 0 })

  if (!user || user.role !== 'MANAGER_BAR') {
    throw new Error('ManagerBarProvider used with invalid user')
  }

  function increment(id: string) {
    setOrder(prev => {
      const index = prev.findIndex(item => id in item)
      if (index === -1) {
        return [...prev, { [id]: 1 }]
      }
      return prev.map((item, i) =>
        i === index
          ? { [id]: item[id] + 1 }
          : item
      )
    })
    console.log(order)
  }

  function decrement(id: string) {
    setOrder(prev => {
      const index = prev.findIndex(item => id in item)
      if (index === -1) return prev
      const quantity = prev[index][id]
      if (quantity === 1) {
        return prev.filter((_, i) => i !== index)
      }
      return prev.map((item, i) =>
        i === index
          ? { [id]: quantity - 1 }
          : item
      )
    })
  }

  const value: ManagerBarUser = {
    role: 'MANAGER_BAR',
    order: order,
    sell_point: sellPoint,
    increment,
    decrement
  }


  return (
    <ActionContext.Provider value={value}>
      {children}
    </ActionContext.Provider>
  )
}
