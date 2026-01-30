import { supabase } from "@pkg/functions/Client";
import { useEffect, useState } from "react";

type ManagerLocation = {
  id: string
  manager: {
    id: string
  }
  location: {
    id: string
    name: string
    prefix: string
    orders: number
    image: string
  }
}

export function useLocationByManager(id?: string) {
  const [data, setData] = useState<ManagerLocation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('managers')
        .select(`
          id,
          manager(id),
          location(*)
        `)
        .eq('manager:users!managers_manager_id_fkey(id)', id)
        .single()

      if (error) {
        setError(error)
      } else {
        setData(data)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [id])

  return { data, isLoading, error }
}
