import { useInformationsList } from "@pkg/hooks/list/getInformations";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { FoodCard } from "@front/components/block/FoodCard";

export default function Foods() {
    const { list, isLoading } = useInformationsList({tableName: 'foods'})

    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0" id="foods">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {list?.map((food: any, index: number) => (
                        <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <FoodCard
                                key={index}
                                name={food.name}
                                image={food.image}
                                price={food.price}
                                description={food.ingredients ? "Components : " + food.ingredients : ''}
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