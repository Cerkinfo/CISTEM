import { DrainCard } from "@front/components/block/DrainCard"
import Loading from "@front/components/utils/Loading"
import { useInformationsList } from "@pkg/hooks/fetch/getInformations"
import { Col, Container, Row } from "reactstrap"

export function Drain() {
    const { list: drains, isLoading } = useInformationsList({tableName: 'drain', subscribe: true})
    return (
        <>
        <section className="drain-page">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {drains
                        ?.map((drain: any) => {
                        if(!drain.name) return null;
                        return (
                            <Col md="3">
                                <DrainCard drain={drain} />
                            </Col>
                        )
                    })}
                </Row>

            </Container>
        )}
        </section>
        </>
    )
}