import { useInventoryList } from "@pkg/hooks/list/getInventory";
import Separator from "../components/headers/Separator";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { MenuCard } from "@front/components/block/MenuCard";

export default function Coffee() {
    const { list, isLoading } = useInventoryList({tableName: 'coffee'})

    return (
        <>
        <Separator title="Coffee"/>
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
                            <MenuCard key={index} name={coffee.name} img={coffee.image} price={coffee.price} price_large={coffee.price_large}/>
                        </Col>
                    ))}
                </Row>

            </Container>
        )}
        </section>
        </>
    );
};