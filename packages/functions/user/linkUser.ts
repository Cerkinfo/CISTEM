import { supabase } from "@pkg/functions/Client";
import { useState } from "react";

export function useUserLink() {
  const [isLoading, setIsLoading] = useState(false)

  const linkUser = async () => {
    setIsLoading(true)

    const { data, error } = await supabase.functions.invoke(
      'link-user',
      {
        body: '',
        headers: {},
      }
    )

    setIsLoading(false)
    if (error) return false;
    else return !!data
  }

  return { linkUser, isLoading }
}