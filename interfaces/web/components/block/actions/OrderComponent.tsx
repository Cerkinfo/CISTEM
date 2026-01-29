import { useAction } from "@pkg/hooks/action/useAction";
import { fetchProductsInfos } from "@pkg/hooks/inventory/getProductInfos";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LocationRow } from "../LocationRow";
import "@styles/components/order-modal.scss"
import { ComponentLine } from "../ComponentLine";

export function OrderComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    //@ts-ignore
    const { order, clearOrder, sendOrder, isLoading, success } = useAction();
    const [productsInfos, setProductsInfos] = useState<Record<string, any>>({})
    const [isOpen_, setIsOpen] = useState(false)

    useEffect(() => {
        async function loadProducts() {
            const entries = order.map((o: any) => Object.entries(o)[0][0])
            const results = await Promise.all(
                entries.map((id: string) => fetchProductsInfos(id))
            )
            const mapped: Record<string, any> = {}
                results.forEach((p: any) => {
                mapped[p.id] = p
            })
            setProductsInfos(mapped)
        }
        if (order.length > 0) loadProducts()
    }, [order])

    useEffect(() => {
        if (success) setIsOpen(false)
        if (isOpen) setIsOpen(true)
    }, [success, isOpen])

    return (
        <Modal isOpen={isOpen_} size="xl" unmountOnClose={true} className="order">
            <ModalHeader style={{display: 'flex', width: '100%'}}>
                <LocationRow />
            </ModalHeader>
            <ModalBody>
                {order.length > 0 ? (
                <ListGroup>
                    {order.map((o: any) => {
                        const [id, quantity] = Object.entries(o)[0]
                        const product = productsInfos[id]
                        if (!product) return null
                        return (
                            <ListGroupItem key={id} style={{ backgroundColor: 'currentColor' }}>
                                <ComponentLine component={product} quantity={quantity} />
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
                ) : (
                    <p style={{color: 'white'}}>Le panier est vide</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button outline color="danger" onClick={() => {close(false), setIsOpen(false)}}>
                    Cancel
                </Button>
                <Button outline color="warning" onClick={() => clearOrder()}>
                    Vider
                </Button>
                <Button outline color="success" onClick={() => sendOrder()}>
                    {isLoading ? 'Loading...' : 'Order'}
                </Button>
            </ModalFooter>
        </Modal>
    )
}