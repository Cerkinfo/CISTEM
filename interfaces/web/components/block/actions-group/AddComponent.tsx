import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Note, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@styles/components/modal.scss";
import { BeerInsert } from "../modals/BeerInsert";

export function AddComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    const [listView, setListView] = useState('beers');
    const list = [
        { key: 'beers', icon: <Beer size={'30'} />, name: 'Bières', 
            view: <BeerInsert />},
        { key: 'softs', icon: <Soft size={'30'} />, name: 'Softs', 
            view: /*<View table='stock_softs'/>*/null},
        { key: 'foods', icon: <Sandwich size={'30'} />, name: 'Nourriture', 
            view: /*<View table='stock_foods'/>*/null},
        { key: 'material', icon: <Note size={'30'} />, name: 'Matériel', 
            view: /*<View table='stock_materials' />*/null}
    ];
    return(
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true}>
            <ModalHeader>
                <ListHeaderBar list={list} view={listView} onChange={setListView} size={'1vw'}/>
            </ModalHeader>
            <ModalBody>
                {list?.find((l: any) => l.key === listView)?.view || listView}
            </ModalBody>
            <ModalFooter>
                <p>ATTENTION ! Vérifie bien toutes les réponses car si il n'y a pas de vérification ici mais l'erreur sera provoquée au niveau du serveur et tu devras tout recommencer !</p>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="success" onClick={() => {}}>
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    )
}