import List from "./list";
import { Double } from "@front/components/text/Double";
import Content from "@front/components/text/Content";
import Separator from "@front/components/headers/Separator";

export function Menu() {
    return (
        <>
            <Separator title="News"/>
            <section className="fosdem-news">
                <Double img="trash_bottles.png"><Content file={'news_trash'} /></Double>
            </section>
            <Separator title="Menu"/>
            <section className="fosdem-menu">
                <List />
            </section>
        </>
    )
}