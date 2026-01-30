import { supabase } from "@pkg/functions/Client";
import { useState } from "react";
import { useSession } from "../ctx";

export function useOrderValid() {
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const updateOrderValid = async (id: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.functions.invoke(
      'valid-order',
      {
        body: { id: id },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (error) setError(error)
    else setData(data)

    setIsLoading(false)
  }

  return { updateOrderValid, data, error, isLoading }
}