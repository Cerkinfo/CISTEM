import { Col } from "reactstrap";
import { MenuCard } from "@front/components/block/MenuCard";
import type { Database } from "@db"
import { FolderInfo } from "@front/components/block/FolderInfo";
import { Beer, Info, ProgressBar } from "@front/components/utils/icons";
import { BeerFlavorsView, BeerInfoView, BeerTasteView } from "@front/components/block/FolderViews";
import { useItem } from "@pkg/hooks/list/getItem";

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

    return (
        <Col style={{ display: "flex", justifyContent: "center" }}>
            <MenuCard
                name={`${beer.name} ${beer.volume}cl`}
                img={beer.image || ""}
                price={beer.price}
            />

            <FolderInfo
                tab1={[
                    <Info size="30" key="info" />,
                    <BeerInfoView
                        key="infoView"
                        title={`${beer.name} ${beer.volume}cl`}
                        type={beer.type}
                        alc={beer.alcohol}
                        desc={beer.description}
                    />,
                ]}
                tab2={[
                    <ProgressBar size="30" key="tasteIcon" />,
                    <BeerTasteView key="tasteView" taste={taste} />,
                ]}
                tab3={[
                    <Beer size="30" key="beerIcon" />,
                    <BeerFlavorsView key="flavorView" flavor={flavor} />,
                ]}
            />
        </Col>
    );
};
