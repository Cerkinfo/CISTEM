import { Double } from "@front/components/text/Double";
import Content from "@front/components/text/Content";
import Separator from "@front/components/headers/Separator";
import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { useState } from "react";
import Beers from "./list/beers";
import Softs from "./list/softs";
import Foods from "./list/foods";
import Coffee from "./list/coffee";
import { Beer, Sandwich, Soft, Coffee as Coffee_ } from "@front/components/utils/coloredIcons";

export function Menu() {
    const [listView, setListView] = useState('beers');
    const list = [
        { key: 'beers', icon: <Beer size={'50'} />, name: 'Bières', view: <Beers /> },
        { key: 'softs', icon: <Soft size={'50'} />, name: 'Softs', view: <Softs /> },
        { key: 'foods', icon: <Sandwich size={'50'} />, name: 'Sandwich', view: <Foods /> },
        { key: 'coffee', icon: <Coffee_ size={'50'} />, name: 'Cafés', view: <Coffee /> }
    ];
    return (
        <>
            <Separator title="News"/>
            <section className="fosdem-news">
                <Double img="trash_bottles.png"><Content file={'news_trash'} /></Double>
            </section>
            <Separator title="Menu"/>
            <section className="fosdem-menu">
                <section className="list">
                    <ListHeaderBar list={ list } view={ listView } onChange={ setListView } />
                    {list.find(item => item.key === listView)?.view}
                </section>
            </section>
        </>
    )
}