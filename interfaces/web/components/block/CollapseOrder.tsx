import { fetchProductsInfos } from "@pkg/hooks/fetch/getProductInfos";
import { useEffect, useState } from "react";
import { Button, Collapse } from "reactstrap";
import { ComponentLine } from "./ComponentLine";
import "@styles/components/collapse-order.scss"
import { getOrderStatus } from "@pkg/utils/string";

export function CollapseOrder({ order } : { order: any }) {
    const [open, setOpen] = useState(false);
    const [productsInfos, setProductsInfos] = useState<Record<string, any>>({})

    useEffect(() => {
        async function loadProducts() {
            const entries = order.order.map((o: any) => Object.entries(o)[0][0])
            const results = await Promise.all(
                entries.map((id: string) => fetchProductsInfos(id))
            )
            const mapped: Record<string, any> = {}
                results.forEach((p: any) => {
                mapped[p.id] = p
            })
            setProductsInfos(mapped)
        }
    
        if (order.order.length > 0) loadProducts()
    }, [order])

    return (
        <div className="order-item">
        <Button
            color={order.status === "PENDING" ? "warning" : order.status === "SENDED" ? "success": "danger"}
            onClick={() => setOpen(o => !o)}
            style={{ width: "100%" }}
        >
            <h4>{order.name}</h4>
            <span>{getOrderStatus(order.status)}</span>
        </Button>

        <Collapse isOpen={open}>
            <div style={{ padding: "0.5rem 0" }}>
                {order.order.map((o: any) => {
                    const [id, quantity] = Object.entries(o)[0]
                    const product = productsInfos[id]
                    if (!product) return null
                    return (
                        <ComponentLine key={id} component={product} quantity={quantity} />
                    )})
                }
            </div>
        </Collapse>
        </div>
    )

}