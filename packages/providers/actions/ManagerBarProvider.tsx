import { ActionContext, type ManagerBarUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"
import { useLocationByManager } from "@pkg/hooks/location/getManagerLocation"
import type { Order } from "@pkg/types/Order"
import type { SellPoint } from "@pkg/types/SellPoint"
import { useEffect, useState } from "react"

export function ManagerBarProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { data } = useLocationByManager(user?.id || '')
  const [order, setOrder] = useState<Order>([])
  const [sellPoint, setSellPoint] = useState<SellPoint | null>(null)

  useEffect(() => {
    if(data && !sellPoint) {
      setSellPoint({
        id: data.location.id,
        name: data.location.name,
        prefix: data.location.prefix,
        orders: data.location.orders,
        image: data.location.image
      })
    }
  }, [data])

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
