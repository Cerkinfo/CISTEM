import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";

export default function Locations() {
    const { list, isLoading } = useInformationsList({tableName: 'locations'})

    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0" id="locations">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {list?.map((loc: any, index: number) => (
                        <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <Card key={index} style={{
                                width: "100%",
                                backgroundColor:"#252525",
                                color: 'white',
                                borderRadius: '25px'
                            }}>
                                <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${loc.prefix}`} />
                                <CardBody>
                                    <CardTitle tag="h1">
                                        {loc.name}
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Container>
        )}
        </section>
        </>
    );
};