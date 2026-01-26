import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Note, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@styles/components/modal.scss";
import { BeerForm } from "./views/BeerForm";
import { SoftForm } from "./views/SoftForm";
import { FoodForm } from "./views/FoodForm";
import { MaterialForm } from "./views/MaterialForm";
import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { useInformationsList } from "@pkg/hooks/list/getInformations";

export function EditComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    const [listView, setListView] = useState('beers');
    const [current, setCurrent] = useState('');
    const {list: data} = useInformationsList({tableName: listView})
    const list = [
        { key: 'beers', icon: <Beer size={'30'} />, name: 'Bières', 
            view: <BeerForm data={current} />},
        { key: 'softs', icon: <Soft size={'30'} />, name: 'Softs', 
            view: <SoftForm />},
        { key: 'foods', icon: <Sandwich size={'30'} />, name: 'Nourriture', 
            view: <FoodForm />},
        { key: 'materials', icon: <Note size={'30'} />, name: 'Matériel', 
            view: <MaterialForm />}
    ];

    function handleChangeView(view: string) {
        setListView(view);
        setCurrent('')
    }
    return(
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true}>
            <ModalHeader>
                <ListHeaderBar list={list} view={listView} onChange={handleChangeView} size={'1vw'}/>
            </ModalHeader>
                <ModalBody>
                    <ComponentDropdown list={data} current={current} onChange={setCurrent}/>
                    {current && list?.find((l: any) => l.key === listView)?.view}
                </ModalBody>
            <ModalFooter>
                <p>ATTENTION ! Vérifie bien toutes les réponses car si il n'y a pas de vérification ici mais l'erreur sera provoquée au niveau du serveur et tu devras tout recommencer !</p>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="success" onClick={() => {}} disabled={!current}>
                    Edit
                </Button>
            </ModalFooter>
        </Modal>
    )
}