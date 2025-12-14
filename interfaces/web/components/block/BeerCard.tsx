import { Col } from "reactstrap";
import { MenuCard } from "@front/components/block/MenuCard";
import type { Database } from "@db"
import { FolderInfo } from "@front/components/block/FolderInfo";
import { Beer, Info, ProgressBar } from "@front/components/utils/icons";
import { useItem } from "@pkg/hooks/list/getItem";
import { InfoView } from "./FolderViews/Info";
import { TasteView } from "./FolderViews/Taste";
import { FlavorsView } from "./FolderViews/Flavors";

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
                tabs={[
                    {
                        icon: <Info size="30" key="info" />,
                        content: (
                            <InfoView
                                key="infoView"
                                title={`${beer.name} ${beer.volume}cl`}
                                type={beer.type}
                                alc={beer.alcohol}
                                desc={beer.description}
                            />
                        ),
                        color: 'MediumBlue'
                    },
                    {
                        icon: <ProgressBar size="30" key="tasteIcon" />,
                        content: <TasteView key="tasteView" taste={taste ?? null} />,
                        color: 'Tomato'
                    },
                    {
                        icon: <Beer size="30" key="beerIcon" />,
                        content: <FlavorsView key="flavorView" flavor={flavor ?? null} />,
                        color: 'DarkRed'
                    }
                ]}
            />
        </Col>
    );
};
