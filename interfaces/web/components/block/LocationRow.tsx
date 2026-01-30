import { useAction } from "@pkg/hooks/action/useAction";
import { Col, Container, Row } from "reactstrap";
import "@styles/components/location-row.scss"

export function LocationRow() {
    //@ts-ignore
    const { sell_point } = useAction()

    return (
        <Container fluid className="location-row">
            <Row>
                <Col md="1">
                    <img src={sell_point.image} alt={sell_point.id} />
                </Col>
                <Col md="9">
                    <span>{sell_point.name}</span>
                </Col>
                <Col md="1">
                    <span>{sell_point.prefix}</span>
                </Col>
                <Col md="1">
                    <span>{sell_point.orders}</span>
                </Col>
            </Row>
        </Container>
    )
}