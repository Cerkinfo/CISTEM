import { ActionContext } from "@pkg/contexts/ActionContext"
import { useContext } from "react"

export function useAction() {
    const ctx = useContext(ActionContext)
    if (!ctx) return null

    if (ctx.role === 'MANAGER_BAR') return {
        role: ctx.role,
        order: ctx.order,
        sell_point: ctx.sell_point,
        isLoading: ctx.isLoading,
        success: ctx.success,
        increment: ctx.increment,
        decrement: ctx.decrement,
        clearOrder: ctx.clearOrder,
        sendOrder: ctx.sendOrder
    }

    if (ctx.role === 'ADMIN') return {
        role: ctx.role
    }
}
