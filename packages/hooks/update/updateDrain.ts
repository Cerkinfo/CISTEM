import { supabase } from "@pkg/functions/Client";
import { useState } from "react";
import { useSession } from "../ctx";

export function useDrainScanned() {
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const updateDrainScanned = async (form: any) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.functions.invoke(
      'update-drain',
      {
        body: {drain : {status: form["status"], id: form["id"]}},
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (error) setError(error)
    else setData(data)

    setIsLoading(false)
  }

  return { updateDrainScanned, data, error, isLoading }
}