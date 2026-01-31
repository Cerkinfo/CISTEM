import type { Order } from "@pkg/types/Order";
import type { SellPoint } from "@pkg/types/SellPoint";
import { createContext } from "react";

export type ManagerBarUser = {
  role: string
  order: Order | null
  sell_point: SellPoint | null
  isLoading: boolean
  success: boolean
  increment: (uuid: string) => void
  decrement: (uuid: string) => void
  clearOrder: () => void
  sendOrder: () => void
}

export const ActionContext = createContext<ManagerBarUser | null>(null)
