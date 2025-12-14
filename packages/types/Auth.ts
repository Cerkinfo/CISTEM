export interface User {
  email: string;
  first_name: string;
  last_name: string;
  pseudo: string;
  image: string;
  role: string;
}

export interface Credentials {
  email: string;
  password: string;
  redirectTo?: string;
}

export type AuthProvider = 'email';