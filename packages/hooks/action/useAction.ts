import { ActionContext } from "@pkg/contexts/ActionContext"
import { useContext } from "react"

export function useAction() {
    const ctx = useContext(ActionContext)
    if (!ctx) return null

    if (ctx.role === 'MANAGER_BAR') return {
        role: ctx.role,
        order: ctx.order,
        increment: ctx.increment,
        decrement: ctx.decrement,
        sell_point: ctx.sell_point
    }

    if (ctx.role === 'ADMIN') return {
        role: ctx.role
    }
}
