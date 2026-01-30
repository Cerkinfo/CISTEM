import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Coffee, Note, People, PubSign, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@styles/components/modal.scss";
import { BeerForm } from "./views/BeerForm";
import { SoftForm } from "./views/SoftForm";
import { FoodForm } from "./views/FoodForm";
import { MaterialForm } from "./views/MaterialForm";
import { CoffeeForm } from "./views/CoffeeForm";
import { UserForm } from "./views/UserForm";
import { LocationForm } from "./views/LocationForm";

export function AddComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    const [listView, setListView] = useState('users');
    const [data, setData] = useState([])
    const list = [
        // { key: 'beers', icon: <Beer size={'30'} />, name: 'Bières', view: <BeerForm data={data} setData={setData} />},
        // { key: 'softs', icon: <Soft size={'30'} />, name: 'Softs', view: <SoftForm />},
        // { key: 'foods', icon: <Sandwich size={'30'} />, name: 'Nourriture', view: <FoodForm />},
        // { key: 'materials', icon: <Note size={'30'} />, name: 'Matériel', view: <MaterialForm />},
        // { key: 'coffee', icon: <Coffee size={'30'} />, name: 'Café', view: <CoffeeForm />},
        { key: 'users', icon: <People size={'30'} />, name: 'Bénévole', view: <UserForm />},
        // { key: 'locations', icon: <PubSign size={'30'} />, name: 'Bar', view: <LocationForm />}
    ];
    return(
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true}>
            <ModalHeader>
                <ListHeaderBar list={list} view={listView} onChange={setListView} size={'1vw'}/>
            </ModalHeader>
            <ModalBody>
                {listView === "beers" && <>
                    <p>
                        Rends-toi sur <a href="https://www.vandb.fr/biere/">vandb.fr</a>, trouve la bière à ajouter et renseigne
                        toutes les informations dans le formulaire ci-dessous.
                    </p>
                    <p>! Attention n'oublie pas de traduire les textes en anglais !</p>
                </>}
                {list?.find((l: any) => l.key === listView)?.view}
            </ModalBody>
            <ModalFooter>
                <p>ATTENTION ! Vérifie bien toutes les réponses car si il n'y a pas de vérification ici mais l'erreur sera provoquée au niveau du serveur et tu devras tout recommencer !</p>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="success" type='submit'>
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    )
}