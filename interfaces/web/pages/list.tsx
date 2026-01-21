import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { useState } from "react";
import Beers from "./list/beers";
import Softs from "./list/softs";
import Foods from "./list/foods";
import Coffee from "./list/coffee";
import Locations from "./list/locations";
import { Beer, PubSign, Sandwich, Soft, Coffee as Coffee_ } from "@front/components/utils/coloredIcons";

export default function List() {
    const [listView, setListView] = useState('beers');
    const list = [
        { key: 'beers', icon: <Beer size={'50'} />, name: 'Bières', view: <Beers /> },
        { key: 'softs', icon: <Soft size={'50'} />, name: 'Softs', view: <Softs /> },
        { key: 'foods', icon: <Sandwich size={'50'} />, name: 'Sandwich', view: <Foods /> },
        { key: 'coffee', icon: <Coffee_ size={'50'} />, name: 'Cafés', view: <Coffee /> },
        { key: 'locations', icon: <PubSign size={'50'} />, name: 'Bars', view: <Locations />}
    ];
    return (
        <section className="list">
            <ListHeaderBar list={ list } view={ listView } onChange={ setListView } />
            {list.find(item => item.key === listView)?.view}
        </section>
    )
}