import { Col } from "reactstrap";
import type { Database } from "@db"
import { InfoView } from "./modals/Info";
import { TasteView } from "./modals/Taste";
import { FlavorsView } from "./modals/Flavors";
import { DrinkCard } from "./DrinkCard";
import { Beer, Graph, Note, SmileyTooth } from "../utils/coloredIcons";

type BeerRow = Database["public"]["Tables"]["beers"]["Row"];

export const BeerItem = ({ beer }: { beer: BeerRow }) => {
    const list = [
        { key: 'main', icon: <Beer size={'20'} />, content: '' },
        { key: 'info', icon: <Note size={'20'} />, content: (
            <InfoView
                key="infoView"
                title={`${beer.name} ${beer.volume}cl`}
                type={beer.type}
                alc={beer.alcohol}
                desc={beer.description}
            />
        ) },
        { key: 'taste', icon: <Graph size={'20'} />, content: (
            <TasteView key="tasteView" beerId={beer.id} />
        ) },
        { key: 'flavors', icon: <SmileyTooth size={'20'} />, content: (
            <FlavorsView key="flavorView" beerId={beer.id} />
        ) },
    ]

    return (
        <Col style={{ display: "flex", justifyContent: "center" }}>
            <DrinkCard
                name={`${beer.name} ${beer.volume}cl`}
                image={beer.image || ""}
                price={beer.price.toFixed(1).toString()}
                list={list}
            />
        </Col>
    );
};
