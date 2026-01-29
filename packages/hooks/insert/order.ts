import { supabase } from "@pkg/functions/Client";
import { useState } from "react";
import { useSession } from "../ctx";

export function useOrderInsert() {
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const insertOrder = async (order: any) => {
    setIsLoading(true)
    setError(null)

    const body = JSON.stringify(order)
    const { data, error } = await supabase.functions.invoke(
      'send-order',
      {
        body: {order : body},
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (error) setError(error)
    else setData(!!data)

    setIsLoading(false)
  }

  return { insertOrder, data, error, isLoading }
}