import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { useState } from "react";
import Beers from "./list/beers";
import Softs from "./list/softs";
import Foods from "./list/foods";
import Coffee from "./list/coffee";
import Locations from "./list/locations";

export default function List() {
    const [listView, setListView] = useState('beers');
    const list = [
        { key: 'beers', value: <Beers /> },
        { key: 'softs', value: <Softs /> },
        { key: 'foods', value: <Foods /> },
        { key: 'coffee', value: <Coffee /> },
        { key: 'locations', value: <Locations />}
    ];
    return (
        <section className="list">
            <ListHeaderBar view={ listView } onChange={ setListView } />
            {list.find(item => item.key === listView)?.value}
        </section>
    )
}