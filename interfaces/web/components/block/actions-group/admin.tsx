import { useState } from "react"
import { SlideButton } from "@front/components/form/buttons/SlideButton";
import { AddComponent } from "./AddComponent";

export function Admin() {
    const [modal, setModal] = useState('');

    return(
        <>
            <li>
                <SlideButton text={'Ajouter un composant'} onClick={() => setModal('add_beer')} />
            </li>
            <AddComponent isOpen={modal === 'add_beer'} close={() => setModal('')} />
        </>
    )
}