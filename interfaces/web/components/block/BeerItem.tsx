import { Col } from "reactstrap";
import type { Database } from "@db"
import { useItem } from "@pkg/hooks/list/getItem";
import { InfoView } from "./modals/Info";
import { TasteView } from "./modals/Taste";
import { FlavorsView } from "./modals/Flavors";
import { DrinkCard } from "./DrinkCard";
import { Beer, Graph, Note, SmileyTooth } from "../utils/coloredIcons";

const useTaste = (beerId: number) : {item : Database["public"]["Tables"]["beers_taste"]["Row"], isLoading : boolean} => {
    return useItem({ tableName: "beers_taste", key: beerId });
};

const useFlavor = (beerId: number) : {item : Database["public"]["Tables"]["beers_flavors"]["Row"], isLoading : boolean}  => {
    return useItem({ tableName: "beers_flavors", key: beerId });
};
type BeerRow = Database["public"]["Tables"]["beers"]["Row"];

export const BeerItem = ({ beer }: { beer: BeerRow }) => {
    const { item: taste } = useTaste(beer.id);
    const { item: flavor } = useFlavor(beer.id);
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
            <TasteView key="tasteView" taste={taste ?? null} />
        ) },
        { key: 'flavors', icon: <SmileyTooth size={'20'} />, content: (
            <FlavorsView key="flavorView" flavor={flavor ?? null} />
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
