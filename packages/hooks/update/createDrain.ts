import { supabase } from "@pkg/functions/Client";
import { useState } from "react";
import { useSession } from "../ctx";

export function useDrainCreate() {
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const updateDrainForCreate = async (form: any) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData();
    if (form.image instanceof File) {
        formData.append('image', form["image"])
    }
    formData.append('drain', JSON.stringify(form))

    const { data, error } = await supabase.functions.invoke(
      'create-drain',
      {
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (error) setError(error)
    else setData(data)

    setIsLoading(false)
  }

  return { updateDrainForCreate, data, error, isLoading }
}