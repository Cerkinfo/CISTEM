import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CollapseOrder } from "../CollapseOrder";
import { useAction } from "@pkg/hooks/action/useAction";
import { useMemo } from "react";
import { LocationRow } from "../LocationRow";
import "@styles/components/order-modal.scss"

export function HistoryOrderComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    //@ts-ignore
    const { sell_point } = useAction();
    if (!sell_point?.id) return null;

    const { list: history, isLoading } = useInformationsList({tableName: 'orders', key: sell_point?.id, eq: 'location', subscribe: true})

    const sortedOrders = useMemo(() => {
        if (!history) return null
        return [...history].sort(
            (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
    }, [history])


    return (
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true} className="order">
            <ModalHeader style={{display: 'flex', width: '100%'}}>
                <LocationRow />
            </ModalHeader>
            <ModalBody>
                {history?.length > 0 ? (
                <ListGroup flush>
                    {sortedOrders?.map((order: any) => { return (
                        <ListGroupItem key={order.id} style={{ backgroundColor: 'currentColor' }}>
                            <CollapseOrder order={order} />
                        </ListGroupItem>
                    )})}
                </ListGroup>
                ) : (isLoading ? <p style={{color: 'white'}}>Loading...</p>
                    :<p style={{color: 'white'}}>L'historique est vide</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}