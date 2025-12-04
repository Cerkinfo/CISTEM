export interface User {
  email: string;
  first_name: string;
  last_name: string;
  peusdo: string;
  image: string;
}

export interface Credentials {
  email: string;
  password: string;
  redirectTo?: string;
}

export type AuthProvider = 'email';