import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";

export default function Inventory() {
    const [listView, setListView] = useState('beers');
    const list = [
            { key: 'beers', icon: <Beer size={'50'} />, name: 'Bières', view: null },
            { key: 'softs', icon: <Soft size={'50'} />, name: 'Softs', view: null },
            { key: 'foods', icon: <Sandwich size={'50'} />, name: 'Sandwich', view: null },
        ];
    return (
        <section className="inventory">
            <ListHeaderBar list={ list } view={ listView } onChange={ setListView } />
            {list.find(item => item.key === listView)?.view}
        </section>
    )
}