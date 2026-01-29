import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Coffee, Note, People, PubSign, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@styles/components/modal.scss";
import { BeerForm } from "./views/BeerForm";
import { SoftForm } from "./views/SoftForm";
import { FoodForm } from "./views/FoodForm";
import { MaterialForm } from "./views/MaterialForm";
import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { useInformationsList } from "@pkg/hooks/list/getInformations";
import { CoffeeForm } from "./views/CoffeeForm";
import { UserForm } from "./views/UserForm";
import { LocationForm } from "./views/LocationForm";

export function EditComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    const [listView, setListView] = useState('beers');
    const [current, setCurrent] = useState<any>('');
    const {list: data} = useInformationsList({tableName: listView as any})
    const [_, setData] = useState([])
    const list = [
        { key: 'beers', icon: <Beer size={'30'} />, name: 'Bières', view: <BeerForm data={data} setData={setData} />},
        { key: 'softs', icon: <Soft size={'30'} />, name: 'Softs', view: <SoftForm data={current} />},
        { key: 'foods', icon: <Sandwich size={'30'} />, name: 'Nourriture', view: <FoodForm data={current} />},
        { key: 'materials', icon: <Note size={'30'} />, name: 'Matériel', view: <MaterialForm data={current} />},
        { key: 'coffee', icon: <Coffee size={'30'} />, name: 'Café', view: <CoffeeForm data={current} />},
        { key: 'users', icon: <People size={'30'} />, name: 'Bénévole', view: <UserForm data={current} />},
        { key: 'locations', icon: <PubSign size={'30'} />, name: 'Bar', view: <LocationForm data={current} />}
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
                    <ComponentDropdown list={data} current={current.name} onChange={setCurrent}/>
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