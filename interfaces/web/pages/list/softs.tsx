import { useInventoryList } from "@pkg/hooks/list/getInventory";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { DrinkCard } from "@front/components/block/DrinkCard";

export default function Softs() {
    const { list, isLoading } = useInventoryList({tableName: 'softs'})

    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0" id="softs">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {list?.map((soft: any, index: number) => (
                        <Col style={{ display: "flex", justifyContent: "center" }}>
                            <DrinkCard 
                                key={index}
                                name={soft.name}
                                image={soft.image}
                                price={soft.price.toFixed(1)}
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