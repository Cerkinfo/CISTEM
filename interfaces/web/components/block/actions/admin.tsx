import { useState } from "react"
import { SlideButton } from "@front/components/form/buttons/SlideButton";
import { AddComponent } from "./AddComponent";
import { EditComponent } from "./EditComponent";
import { RemoveComponent } from "./RemoveComponent";

export function Admin() {
    const [modal, setModal] = useState('');

    return(
        <>
            <li>
                <SlideButton text={'Ajouter'} onClick={() => setModal('add')} />
            </li>
            {/* <li>
                <SlideButton text={'Editer'} onClick={() => setModal('edit')} />
            </li>
            <li>
                <SlideButton text={'Supprimer'} onClick={() => setModal('remove')} />
            </li> */}
            <AddComponent isOpen={modal === 'add'} close={() => setModal('')} />
            {/* <EditComponent isOpen={modal === 'edit'} close={() => setModal('')} />
            <RemoveComponent isOpen={modal === 'remove'} close={() => setModal('')} /> */}
        </>
    )
}