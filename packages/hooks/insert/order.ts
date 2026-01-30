import { supabase } from "@pkg/functions/Client";
import { useState } from "react";
import { useSession } from "../ctx";

export function useOrderInsert() {
  const { session } = useSession()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const insertOrder = async (order: any) => {
    setError(null)

    const body = JSON.stringify(order)
    const { data, error } = await supabase.functions.invoke(
      'send-order',
      {
        body: { order: body },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (error) { 
        setError(error)
        return false
    }
    else setData(!!data)

    setData(true)
    return true
  }

  return { insertOrder, data, error }
}