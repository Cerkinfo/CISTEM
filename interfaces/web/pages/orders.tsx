import { CollapseOrder } from "@front/components/block/CollapseOrder";
import { SwitcherButton } from "@front/components/form/buttons/SwitchButton";
import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { useMemo, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "@styles/pages/order.scss"

export function Orders() {
    const [status, setStatus] = useState('PENDING');
    const { list: history, isLoading } = useInformationsList({tableName: 'orders', key: status, eq: 'status', subscribe: true})
    
    const sortedOrders = useMemo(() => {
        if (!history) return null
        return [...history].sort(
            (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        )
    }, [history])

    return (
        <section className="order-page">
            <Container fluid>
                <div className="switcher_">
                    <SwitcherButton current={status} choices={['PENDING', 'SENDED']} onSelect={ setStatus } />
                </div>
                <Row>
                    {history?.length > 0 ? (
                        <div className="order-items">
                            {sortedOrders?.map((order: any) => { return (<>
                                <Col md="10">
                                    <CollapseOrder order={order} isOpen={true}/>
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