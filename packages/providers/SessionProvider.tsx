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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [onlineUsers, setOnlineUsers] = useState<Array<{ pseudo: string; image?: string | null }>>([]);

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
      setUser(undefined);
      return;
    }
    const loadAccount = async () => {
      try {
        const userData = await fetchUser(session)
        setUser(userData);
      } catch (error) {
        console.log('🚀 ~ loadAccount ~ error:', error);
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, [session]);

  useEffect(() => {
    let channel: any = null;
    if (session && user) {
      (async () => {
        try {
          channel = supabase.channel('online-users', {
            config: { presence: { key: user.pseudo } }
          });

          channel.on('presence', { event: 'sync' }, () => {
            try {
              const state = channel.presenceState();
              const users = state
                ? Object.entries(state).map(([pseudo, metas]: any) => ({
                    pseudo,
                    image: metas?.[0]?.image ?? null,
                  }))
                : [];
              setOnlineUsers(users);
            } catch (err) {
              console.error('Error reading presence state', err);
            }
          });

          await channel.subscribe();

          try {
            await channel.track({ pseudo: user.pseudo, image: (user as any).image ?? null });
          } catch (err) {
            console.error('Failed to track presence', err);
          }
        } catch (err) {
          console.error('Presence channel setup failed', err);
        }
      })();
    }

    return () => {
      if (!channel) return;
      (async () => {
        try {
          await channel.untrack();
        } catch (err) {}
        try {
          await channel.unsubscribe();
        } catch (err) {
          try {
            // @ts-ignore
            supabase.removeChannel?.(channel);
          } catch (e) {
            console.error('Failed to unsubscribe presence channel', e);
          }
        }
        setOnlineUsers([]);
      })();
    };
  }, [session, user]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (provider, credentials) => {
          return handleSignin({ provider, credentials });
        },
        signUp: async (provider, credentials) => {
          setUser(undefined);
          setSession(null);
          return handleSignup({ provider, credentials });
        },
        signOut: async () => {
          return supabase.auth.signOut();
        },
        user,
        session,
        isLoading,
        onlineUsers,
        isUserOnline: (pseudo: string) => onlineUsers.some(u => u.pseudo === pseudo),
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const SessionProvider = memo(SessionProviderCore)