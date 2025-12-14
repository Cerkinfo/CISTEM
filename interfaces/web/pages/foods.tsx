import { useInventoryList } from "@pkg/hooks/list/getInventory";
import Separator from "../components/headers/Separator";
import { Col, Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { MenuCard } from "@front/components/block/MenuCard";
import { FolderInfo } from "@front/components/block/FolderInfo";
import { Info } from "@front/components/utils/icons";
import { FoodInfoView } from "@front/components/block/FolderViews/FoodInfo";

export default function Foods() {
    const { list, isLoading } = useInventoryList({tableName: 'foods'})

    return (
        <>
        <Separator title="Foods"/>
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
                            <MenuCard key={index} name={food.name} img={food.image} price={food.price}/>
                            {food.ingredients.length > 0 ? 
                            <FolderInfo
                                tabs={[
                                    {
                                        icon: <Info size='30'/>, 
                                        content: <FoodInfoView title={food.name} ingredients={food.ingredients}/>,
                                        color: 'MediumBlue'
                                    }
                                ]}
                            />
                            : null }
                        </Col>
                    ))}
                </Row>

            </Container>
        )}
        </section>
        </>
    );
};