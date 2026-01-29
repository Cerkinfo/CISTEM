import { supabase } from "@pkg/functions/Client";
import { useState } from "react";

export function useUserCheck() {
  const [isLoading, setIsLoading] = useState(false)

  const checkUser = async (email: string) => {
    setIsLoading(true)

    const { data, error } = await supabase.functions.invoke(
      'check-user',
      {
        body: {email},
        headers: {},
      }
    )

    setIsLoading(false)
    if (error) return false;
    else return !!data
  }

  return { checkUser, isLoading }
}