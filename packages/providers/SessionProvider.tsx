import type { Session } from '@supabase/supabase-js';
import React, { memo, useEffect, useState } from 'react';
import { supabase } from '@pkg/functions/Client';
import { AuthContext } from '@pkg/contexts/AuthContext';
import { handleSignup } from '@pkg/functions/session/signup';
import type { User } from '@pkg/types/Auth';
import { fetchUser } from '@pkg/functions/user/fetchUser';
import { handleSignin } from '@pkg/functions/session/signin';

interface SessionProps {
  pushToken?: string;
}

export const SessionProviderCore = (props: React.PropsWithChildren<SessionProps>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, _session) => {
      if (!_session) {
          setIsLoading(false);
      }
      setSession(_session);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setUser(null);
      return;
    }
    const loadAccount = async () => {
      try {
        const userData = await fetchUser(session)
        setUser(userData);
      } catch (error) {
        console.log('🚀 ~ loadAccount ~ error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (provider, credentials) => {
          return handleSignin({ provider, credentials });
        },
        signUp: async (provider, credentials) => {
          setUser(null);
          setSession(null);
          return handleSignup({ provider, credentials });
        },
        signOut: async () => {
          return supabase.auth.signOut();
        },
        user,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const SessionProvider = memo(SessionProviderCore)