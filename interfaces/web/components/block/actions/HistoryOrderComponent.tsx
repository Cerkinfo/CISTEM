import { fetchProductsInfos } from "@pkg/hooks/inventory/getProductInfos";
import { useInformationsList } from "@pkg/hooks/list/getInformations";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function HistoryOrderComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    //@ts-ignore
    const { list: history, isLoading } = useInformationsList({tableName: 'orders', subscribe: true})
    const [productsInfos, setProductsInfos] = useState<Record<string, any>>({})

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

    return (
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true}>
            <ModalHeader>
                
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
                            <p style={{ color: '#fff' }}>{product.name} × {quantity}</p>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
                ) : (
                    <p style={{color: 'white'}}>L'historique est vide</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="success" type='submit'>
                    Order
                </Button>
            </ModalFooter>
        </Modal>
    )
}