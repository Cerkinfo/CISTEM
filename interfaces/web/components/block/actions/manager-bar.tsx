import { SlideButton } from "@front/components/form/buttons/SlideButton";
import { useState } from "react";

export function ManagerBar() {
    const [modal, setModal] = useState('');
    
    return(
        <>
            <li>
                <SlideButton text={'Voir le panier'} onClick={() => setModal('panier')} />
            </li>
        </>
    )
}