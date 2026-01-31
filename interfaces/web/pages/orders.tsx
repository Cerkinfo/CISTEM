import { CollapseOrder } from "@front/components/block/CollapseOrder";
import { SwitcherButton } from "@front/components/form/buttons/SwitchButton";
import { useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "@styles/pages/order.scss"
import { useOrdersList } from "@pkg/hooks/fetch/getOrders";

export function Orders() {
    const [status, setStatus] = useState('PENDING');
    const { orders, isLoading } = useOrdersList({status: status})
    
    const sortedOrders = useMemo(() => {
        if (!orders) return null
        if (status === 'PENDING') return [...orders].sort(
            (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        )
        return [...orders].sort(
            (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
    }, [orders])

    return (
        <section className="order-page">
            <Container fluid>
                <div className="switcher_">
                    <SwitcherButton current={status} choices={['PENDING', 'SENDED']} onSelect={ setStatus } />
                </div>
                <Row>
                    {orders?.length > 0 ? (
                        <div className="order-items">
                            {sortedOrders?.map((order: any) => { return (<>
                                <Col md="10">
                                    <CollapseOrder order={order} isOpen={true} />
                                </Col>
                            </>)})}
                        </div>
                        ) : (isLoading ? <p style={{color: 'white'}}>Loading...</p>
                            :<p style={{color: 'white'}}>L'historique est vide</p>
                    )}
                </Row>
            </Container>
        </section>
    )
}