import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { StockCard } from "@front/components/block/StockCard";
import { Beer, Note, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import Loading from "@front/components/utils/Loading";
import { useInventoryList } from "@pkg/hooks/inventory/getInventory";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";

function View({ table } : { table: any }) {
    const { list, isLoading } = useInventoryList({tableName: table})

    return (
        <div className="inventory-item">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Row>
                {list?.map((item: any) => (
                    <Col lg="3" md="6" sm="12" style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                        <StockCard
                            key={item.id}
                            image={item.id.image}
                            title={item.id.name}
                            per_crate={item.entity_per_crate}
                            quantity={item.stock}
                        />
                    </Col>
                ))}
            </Row>
        )}
        </div>
    )
}

export default function Inventory() {
    const [listView, setListView] = useState('beers');
    const list = [
        { key: 'beers', icon: <Beer size={'50'} />, name: 'Bières', 
            view: <View table='stock_beers' />},
        { key: 'softs', icon: <Soft size={'50'} />, name: 'Softs', 
            view: <View table='stock_softs'/>},
        { key: 'foods', icon: <Sandwich size={'50'} />, name: 'Nourriture', 
            view: <View table='stock_foods'/>},
        { key: 'material', icon: <Note size={'50'} />, name: 'Matériel', 
            view: <View table='stock_materials' />}
    ];
    return (
        <section className="inventory">
            <>
            <ListHeaderBar list={ list } view={ listView } onChange={ setListView } />
                <Container fluid>
                    {list && list.find(item => item.key === listView)?.view}
                </Container>
            </>
        </section>
    )
}