import { SlideButton } from "@front/components/form/buttons/SlideButton";
import { useState } from "react";
import { OrderComponent } from "./OderComponent";

export function ManagerBar() {
    const [modal, setModal] = useState('');
    
    return(
        <>
            <li>
                <SlideButton text={'Voir le panier'} onClick={() => setModal('panier')} />
            </li>
            <OrderComponent isOpen={modal === 'panier'} close={() => setModal('')} />
        </>
    )
}