import type { Order } from "@pkg/types/Order";
import type { SellPoint } from "@pkg/types/SellPoint";
import { createContext } from "react";

export type AdminUser = {
  role: 'ADMIN'
}

export type ManagerBarUser = {
  role: 'MANAGER_BAR'
  order: Order | null
  sell_point: SellPoint | null
  isLoading: boolean
  success: boolean
  increment: (uuid: string) => void
  decrement: (uuid: string) => void
  clearOrder: () => void
  sendOrder: () => void
}

export type BenevoleUser = {
  role: string
}

export type ActionUser =
  | AdminUser
  | ManagerBarUser
  | BenevoleUser


export const ActionContext = createContext<ActionUser | null>(null)
