import { useInventoryList } from "@pkg/hooks/list/getInventory";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { DrinkCard } from "@front/components/block/DrinkCard";

export default function Coffee() {
    const { list, isLoading } = useInventoryList({tableName: 'coffee'})

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
                                price={coffee.price}
                                price2={coffee.price_large ? 'L' + coffee.price_large : undefined}
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