import { supabase } from "@pkg/functions/Client";
import type { AuthProvider, Credentials } from "@pkg/types/Auth";

export async function handleSignup({
  provider,
  credentials,
}: {
  provider: AuthProvider;
  credentials: Credentials;
}) {
  let data: any = null;
  let error: any = null;

  if (provider === "email") {
    const res = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: credentials.redirectTo,
      },
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
