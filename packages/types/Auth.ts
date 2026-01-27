import { Constants, type Database } from "./Database";

export type Role = Database["public"]["Enums"]["ROLE"]
export const ROLE = Constants.public.Enums.ROLE;

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  pseudo: string;
  image: string;
  role: Role;
}

export interface Credentials {
  email: string;
  password: string;
  redirectTo?: string;
}

export type AuthProvider = 'email';