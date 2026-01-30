import { ListHeaderBar } from "@front/components/bar/ListHeaderBar";
import { Beer, Note, Sandwich, Soft } from "@front/components/utils/coloredIcons";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@styles/components/modal.scss";
import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { DrinkCard } from "../DrinkCard";

export function RemoveComponent({ isOpen, close } : { isOpen: boolean, close: (b: boolean) => void}) {
    const [listView, setListView] = useState('beers');
    const [current, setCurrent] = useState<any>('');
    const {list: data} = useInformationsList({tableName: listView as any})
    const list = [
        { key: 'beers', icon: <Beer size={'30'} />, name: 'Bières', 
            view: (
                <DrinkCard 
                    name={`${current.name} ${current.volume}cl`}
                    image={current.image}
                    price={current.price}
                />
            )},
        { key: 'softs', icon: <Soft size={'30'} />, name: 'Softs', 
            view: (
                <DrinkCard 
                    name={`${current.name} ${current.volume}cl`}
                    image={current.image}
                    price={current.price}
                />
            )},
        { key: 'foods', icon: <Sandwich size={'30'} />, name: 'Nourriture', 
            view: (
                <DrinkCard 
                    name={current.name}
                    image={current.image}
                    price={current.price}
                />
            )},
        { key: 'materials', icon: <Note size={'30'} />, name: 'Matériel', 
            view: (
                <DrinkCard 
                    name={current.name}
                    image={current.image}
                    price={current.price}
                />
            )}
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
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {current && list?.find((l: any) => l.key === listView)?.view}
                    </div>
                </ModalBody>
            <ModalFooter>
                <p>ATTENTION ! Cette action est irréversible, il n'y a de sauvegarde nulle part dans la base de donnée !</p>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="warning" onClick={() => {}} disabled={!current}>
                    Remove
                </Button>
            </ModalFooter>
        </Modal>
    )
}