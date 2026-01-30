import { SlideButton } from "@front/components/form/buttons/SlideButton";
import { useState } from "react";
import { OrderComponent } from "./OrderComponent";
import { HistoryOrderComponent } from "./HistoryOrderComponent";

export function ManagerBar() {
    const [modal, setModal] = useState('');
    
    return(
        <>
            <li>
                <SlideButton text={'Voir le panier'} onClick={() => setModal('panier')} />
            </li>
            <li>
                <SlideButton text={"Voir l'historique"} onClick={() => setModal('history')} />
            </li>
            <OrderComponent isOpen={modal === 'panier'} close={() => setModal('')} />
            <HistoryOrderComponent isOpen={modal === 'history'} close={() => setModal('')} />
        </>
    )
}