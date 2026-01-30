import Loading from "@front/components/utils/Loading";
import { useInformationsList } from "@pkg/hooks/fetch/getInformations"
import { Col, Container, Row } from "reactstrap";
import "@styles/pages/benevoles.scss"
import { UserBlock } from "@front/components/block/UserBlock";

export function Benevoles() {
    const { list: users, isLoading } = useInformationsList({tableName: 'users', subscribe: true});
    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0 benevoles">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {users.map((user: any) => { return (
                        <Col md='3'>
                        <UserBlock user={user} role />
                        </Col>
                    )})}
                </Row>

            </Container>
        )}
        </section>
        </>
    )
}