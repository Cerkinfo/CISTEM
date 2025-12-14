import { Window } from "@front/components/block/Window";
import Separator from "@front/components/headers/Separator";
import { Alert_ } from "@front/components/text/Alert";
import Content from "@front/components/text/Content";
import { Center, H3, Text } from "@front/styles/components/titles";
import { AccordionBody, AccordionHeader, AccordionItem, Col, Container, UncontrolledAccordion, Row, Alert } from "reactstrap";

export default function HowToFOSDEM() {
    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0">
        <Window title={'Hello World!'}>
            <Content file={'intro'} />
        </Window>
        </section>
        <Separator title={'The FOSDEM Manual'} />
        <section className="section section-lg section-shaped m-0">
        <Center>
            <H3>How to use CISTEM at FOSDEM?</H3>
        </Center>
        </section>
        </>
    )
}