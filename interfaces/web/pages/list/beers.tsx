import { useInformationsList } from "@pkg/hooks/list/getInformations";
import { Container, Row } from "reactstrap";
import Loading from "@front/components/utils/Loading";
import { BeerItem } from "@front/components/block/BeerItem";

export default function Beers() {
    const { list, isLoading } = useInformationsList({tableName: 'beers'})

    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0" id="beers">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {list?.map((beer: any, index: number) => (
                        <BeerItem key={index} beer={beer} />
                    ))}
                </Row>

            </Container>
        )}
        </section>
        </>
    );
};