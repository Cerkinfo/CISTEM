import {
  AuthError,
  type AuthResponse,
  type AuthTokenResponsePassword,
  type Session,
} from '@supabase/supabase-js';
import React from 'react';
import type { User, AuthProvider, Credentials } from '../types/Auth';

export const AuthContext = React.createContext<{
  signIn: (
    provider: AuthProvider,
    credential: Credentials
  ) => Promise<AuthTokenResponsePassword>;
  signUp: (
    provider: AuthProvider, 
    credential: Credentials
  ) => Promise<AuthResponse>;
  signOut: () => void;
  session: Session | null;
  user: User | undefined;
  isLoading: boolean;
  onlineUsers: Array<{ pseudo: string; image?: string | null }>;
  isUserOnline: (pseudo: string) => boolean;
}>({
  signIn: ( _: AuthProvider, __: Credentials) =>
    Promise.resolve({ data: { user: null, session: null }, error: new AuthError('not Init') }),
  signUp: (_: AuthProvider, __: Credentials) =>
    Promise.resolve({ data: { user: null, session: null }, error: null }),
  signOut: () => Promise.resolve(),
  session: null,
  user: undefined,
  isLoading: true,
  onlineUsers: [],
  isUserOnline: (_: string) => false,
});