import { useInventoryList } from "@pkg/hooks/list/getInventory";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { MenuCard } from "@front/components/block/MenuCard";

export default function Locations() {
    const { list, isLoading } = useInventoryList({tableName: 'locations'})

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
                            <MenuCard 
                                key={index} 
                                name={loc.name} 
                                img={`https://api.dicebear.com/9.x/initials/svg?seed=${loc.prefix}`} 
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