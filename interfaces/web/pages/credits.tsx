import CISTEM from "@front/components/utils/CISTEM";
import { useLogout } from "@pkg/hooks/auth/logout";
import { Button, Col, Container, Row } from "reactstrap";

export function Credits() {
    const { logOut, isLoading } = useLogout();

    return (
        <Container fluid>
            <section className="credits">
                <Row>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CISTEM size={150}/>
                    </div>
                    <hr />
                </Row>
                    <Row>
                        <Col md="6" style={{display: 'flex', justifyContent: 'center'}}>
                            <Button outline color="warning" onClick={() => logOut()} style={{display: 'flex', width: '100%', fontSize: '25px'}}>
                                {isLoading ? "Loading..." : "Se déconnecter"}
                            </Button>
                        </Col>
                    </Row>
            </section>
        </Container>
    )
}