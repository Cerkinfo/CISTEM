import { ActionContext, type ManagerBarUser } from "@pkg/contexts/ActionContext"
import { useSession } from "@pkg/hooks/ctx"
import { useOrderInsert } from "@pkg/hooks/insert/order"
import { useLocationByManager } from "@pkg/hooks/fetch/getManagerLocation"
import type { Order } from "@pkg/types/Order"
import type { SellPoint } from "@pkg/types/SellPoint"
import { useEffect, useState } from "react"

export function ManagerBarProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { data } = useLocationByManager(user?.id || '')
  const [order, setOrder] = useState<Order>([])
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sellPoint, setSellPoint] = useState<SellPoint | null>(null)
  const { insertOrder } = useOrderInsert()
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
          setSuccess(false);
      }, 500);
    }
  }, [success])

  useEffect(() => {
    if (accepted) {
      setOrder([])
      setSuccess(true)
      setAccepted(false)
    }
  }, [accepted])

  useEffect(() => {
    if(data && !sellPoint) {
      setSellPoint({
        id: data.location.id,
        name: data.location.name,
        prefix: data.location.prefix,
        orders: data.location.orders,
        image: data.location.image || null
      })
    }
  }, [data])

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

  function clearOrder() {
    setOrder([]);
    setSuccess(true);
  }

  async function sendOrder() {
    setIsLoading(true)
    setAccepted(await insertOrder(order))
    setIsLoading(false)
  }

  const value: ManagerBarUser = {
    role: user?.role || 'BENEVOLE',
    order: order,
    sell_point: sellPoint,
    isLoading: isLoading,
    success: success,
    increment,
    decrement,
    clearOrder,
    sendOrder
  }

  return (
    <ActionContext.Provider value={value}>
      {children}
    </ActionContext.Provider>
  )
}
