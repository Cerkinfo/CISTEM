import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { DrinkCard } from "@front/components/block/DrinkCard";

export default function Coffee() {
    const { list, isLoading } = useInformationsList({tableName: 'coffee'})

    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0" id="coffee">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {list?.map((coffee: any, index: number) => (
                        <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <DrinkCard coffee
                                key={index}
                                name={coffee.name}
                                image={coffee.image}
                                price={coffee.price.toFixed(1)}
                                price2={coffee.price_large ? 'Large ' + coffee.price_large.toFixed(1) + ' €' : undefined}
                            />
                        </Col>
                    ))}
                </Row>

            </Container>
        )}
        </section>
        </>
    );
};