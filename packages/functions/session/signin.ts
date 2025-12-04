import { supabase } from "@pkg/functions/Client";
import type { AuthProvider, Credentials } from "@pkg/types/Auth";

export async function handleSignin({
  provider,
  credentials,
}: {
  provider: AuthProvider;
  credentials: Credentials;
}) {
  let data: any = null;
  let error: any = null;

  if (provider === "email") {
    const res = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    data = (res as any).data;
    error = (res as any).error;
    // gérer data / error
  } else {
    const res = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: credentials.redirectTo,
      },
    });

    data = (res as any).data;
    error = (res as any).error;
    // gérer data / error
  }

  return { data, error };
}
